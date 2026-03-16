const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailService = require("../services/email.service");

async function registerUser(req,res) {

    try{
        const { username, email, password } = req.body;

        // whether all data is provided or not
        if(!username || !email || !password){
            return res.status(400).json({
                message: "something is missing",
                success: false
            })
        }

        // to check if user exists or not
        const isUserAlreadyExists = await userModel.findOne({email: email.trim().toLowerCase()});
        // if exists then send a message
        if(isUserAlreadyExists){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        // check role of admin
        let finalRole = "user";

        if(req.body.role === "recruiter"){
            finalRole = "recruiter";
        }
        else if (req.body.role === "admin"){
            if(!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_SECRET){
                return res.status(403).json({
                    message: "not an admin",
                    success: false,
                });
            }
            // only one admin allowed 
            const existingAdmin = await userModel.findOne({role: "admin"});

            if(existingAdmin){
                return res.status(400).json({
                    message: "Admin already exists .Only one admin allowed"
                });
            }
            finalRole = "admin"
        }

        // hashing of password  [10 - salt "delay attack"]
        const hash = await bcrypt.hash(password, 10);

        // if  user not exist then create a user 
        const user = await userModel.create({
            username,
            email,
            password: hash,
            role:finalRole
        })

        // user create hone ke baad ek token create krna hoga 
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        // set the token in the cookie
        res.cookie("token", token);
        console.log(token);

        await emailService.sendRegisterationEmail(user.email,user.username);

        // if token is set  then send the successfull response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    }
    catch(error){
        console.log(error);
    }

}

async function loginUser(req,res) {

    try{
        const {email, password} = req.body;

        // check data is there or not
        if(!email || !password ){
            return res.status(400).json({
                message: "something is missing",
                success: false
            })
        }
        // find user is there or not 
        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        

        // if user is not there return false
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        //here bcrypt compare the password "user jo paasword dalega usse convert kregi hash mein" and this.password "jo db me hashed passowrd hai"
        //compare (password"user jo dalega usse hash krke"and user.password"jo db me stored hash hai") 
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // if password not valid 
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password wrong" });
        }

        //check role
        /*
        if(role?.toLowerCase() !== user.role?.toLowerCase()){
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        }
     */
        // if admin n already looged in
        if(user.role === "admin" && user.isLoggedIn){
            return res.status(403).json({
                message: "Amin already logged in from another device."
            })
        }

        // if password valid,  create token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET,{expiresIn: "1d"});

        if(user.role === "admin"){
            user.isLoggedIn = true;
            await user.save();
        }

        //set token in cookie
        res.cookie("token", token);
        console.log(token);

        //send successful response
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        })
        console.log(user);
    }
    catch(error){
        console.log(error);
    }

}

async function logoutUser(req,res) {
    try{
        const token = req.cookies.token;
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);
            if(user && user.role === "admin"){
                user.isLoggedIn = false;
                await user.save();
            }
        }
        res.clearCookie("token");
        res.status(200).json({
            message: "User logged out successfully"
        });
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { registerUser , loginUser, logoutUser };