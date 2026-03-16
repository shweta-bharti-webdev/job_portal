const userModel = require("../models/user.model");
const companyModel = require("../models/company.model");
const jobModel = require("../models/job.model");
const applicationModel = require("../models/application.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function adminOrNot(req, res) {

  try {

    const { username, email, password, adminKey } = req.body;

    // check fields
    if (!username || !email || !password || !adminKey) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check admin secret key
    if (adminKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        message: "Invalid admin key"
      });
    }

    // check admin already exists
    const existingAdmin = await userModel.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    // check email already exists
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create admin
    const admin = await userModel.create({
      username,
      email,
      password: hash,
      role: "admin"
    });

    // create token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }

}


async function getAdminDashboard(req,res){
    try{
        // count data 
        const totalUsers = await userModel.countDocuments({role: "user"});
        const totalRecruiters = await userModel.countDocuments({role: "recruiter"});
        const totalAdmins = await userModel.countDocuments({role: "admin"});

        const totalJobs = await jobModel.countDocuments();
        const totalCompanies = await companyModel.countDocuments();
        const totalApplications = await applicationModel.countDocuments();


        // get 5 users

        const recentUsers = await userModel.find().sort({createdAt: -1}).limit(5).select("-password");

        // get 5 jobs

        const recentJobs = await jobModel.find().sort({createdAt: -1}).limit(5);

        res.status(200).json({
            message: "fetched successfully",
            success: true,
            dashboard: {
                totals:{
                    totalUsers,
                    totalRecruiters,
                    totalAdmins,
                    totalJobs,
                    totalCompanies,
                    totalApplications
                },
            recentUsers,
            recentJobs
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
}

async function getAllUsers(req,res){
    try{
        const users = await userModel.find({role: "user"}).sort({createdAt: -1}).select("-password");

        res.status(200).json({
            message: "successfully fetched",
            success: true,
            count: users.length,
            users
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error fetching users",
            success: false,
        });
    }
}

async function getSingleUser(req,res){
   try{
        const user = await userModel.findOne({_id: req.params.id,role: "user"}).select("-password");

        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }
    
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error",
            success: false,
        });
    }
}

async function deleteUser(req,res){
    try{
        const {id} = req.params;

        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            message: "user deleted successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error deleting user",
            success: false,
        });
    }
}

async function toggleBlockUser(req,res){
    try{
        const {id} = req.params;

        const user = await userModel.findById(id);

        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }
        user.isBlocked = !user.isBlocked; // toggle
        await user.save();

        return res.status(200).json({
            success: true,
            message: user .isBlocked ? "user blocked successfully" : "user unblocked successfully",
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message :"server error",
            success: false,
        });
    }
}

async function getAllRecruiters(req,res){
    try{
        const recruiters = await userModel.find({role: "recruiter"}).sort({createdAt: -1}).select("-password");

        res.status(200).json({
            message:"fetched successfully",
            success: true,
            count: recruiters.length,
            recruiters,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message :"server error",
            success: false,
        });
    }
}

async function getSingleRecruiter(req,res){
    try{
        const recruiter = await userModel.findOne({_id: req.params.id,role: "recruiter"}).select("-password");

        if(!recruiter){
            return res.status(404).json({
                message: "recruiter not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            recruiter,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error",
            success: false,
        });
    }
}

async function deleteRecruiter(req,res){
    try{
        const recruiter = await userModel.findByIdAndDelete({_id: req.params.id, role :"recruiter"});

        if(!recruiter){
        return res.status(404).json({
            success:false,
            message: "recruiter not found",
        });
        }
        return res.status(200).json({
            success: true,
            message:"recruiter deleted successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error",
            success: false,
        })
    }
}

async function toggleBlockRecruiter(req,res){
    try{
        const userId = req.params.id;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        // toggle 
        user.isBlocked = !user.isBlocked;

        await user.save();

        return res.status(200).json({
            success: true,
            message: user.isBlocked ? "user has been blocked" : "user has been unblocked",
            user
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

module.exports = {adminOrNot, getAdminDashboard,getAllUsers,getSingleUser,deleteUser,toggleBlockUser,getAllRecruiters,getSingleRecruiter,deleteRecruiter,toggleBlockRecruiter};