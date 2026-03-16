const userModel = require("../models/user.model");
const jobModel = require("../models/job.model");
const applicationModel = require("../models/application.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function getMyProfile(req, res) {
  try {

    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

async function updateProfile(req,res){
    try{
        const {username, email, password} = req.body;
        const userId = req.id;

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false
            });
        }
        console.log(user);
        // update fields if provided
        if(username) user.username = username.trim();
        if(email) user.email = email.trim().toLowerCase();
        if(password){
            const hash = await bcrypt.hash(password, 10);
            user.password =  hash;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user:{ 
                id: user._id,
                usename: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

async function getJobs(req,res){
    try{
        const jobs = await jobModel.find(); // get all jobs

        res.status(200).json({
        success: true,
        jobs: jobs,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).message({
            message: "error fetching jobs",
            success: false
        });
    }
}

async function getJobById(req,res){
    try{
        const jobId = req.params.id; // get id from URL

        const job = await jobModel.findById(jobId);

        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "job found",
            success: true,
            job: job
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "error fetching job",
            success: false,
        });
    }
}

async function applyJob(req,res){
    try{
        const userId = req.user._id;//from middleware

        const jobId = req.params.id; 

        // check job is there or not

        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            });
        }

        //check if alresdy applied 
        const alreadyApplied = await applicationModel.findOne({
            job: jobId,
            applicant: userId,
        });
        if(alreadyApplied){
            return res.status(400).json({
                message: "you have already applied to this job",
                success: false,
            });
        }

        // create application
        const application = await applicationModel.create({
            job: jobId,
            applicant: userId,
        });

        return res.status(201).json({
            messsage: "job applied sucessfully",
            application:application,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        })
    }
}

async function getMyApplications(req,res){
    try{
        const userId  = req.user._id;// from midddliware

        const applications = await applicationModel.find({applicant: userId}).populate("job"); // job details

        if(!applications || applications.length === 0){
            return res.status(404).json({
                message : "no applications found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "my applications fetched successfully",
            success: true,
            applications,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        })
    }
}

module.exports = {getMyProfile, updateProfile , getJobs ,getJobById, applyJob, getMyApplications};