const userModel = require("../models/user.model");
const companyModel = require("../models/company.model");
const jobModel = require("../models/job.model");
const applicationModel = require("../models/application.model");
const { sendApplicationStatusEmail } = require("../services/email.service");
/*
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getJobs } = require("./user.controller");
*/

async function getRecruiterProfile(req,res){
    try{
        // finding recruiter in database and by using (select) -- removing the password from the response
        const recruiter = await userModel.findById(req.user.id).populate("company").select("-password");
        console.log(recruiter);

        // if recruiter not found in db
        if(!recruiter){
            return res.status(404).json({
                message: "recruiter not found",
                success: false,
            });
        }
        // if recruiter found send the profile ddta
        res.status(200).json({
            success: true,
            message: "profile fetched successfully",
            recruiter,// sending full recruiter detail
        });
    }
    catch(error){
        res.status(500).json({
            message: "server error",
            success: false
        })
    }
}

async function createCompany(req,res){
    try{
        /*
        const user = req.user;

        if (user.role !== "recruiter") {
        return res.status(403).json({
            success: false,
            message: "Only recruiters can create a company"
        });
        }

        const { name, description, website, location, logo, userId } = req.body;
        const newCompany = new companyModel({
            name,
            description,
            website,
            location,
            logo,
            userId:user._id
        })

        // save company id inside recruiter
        await newCompany.save();
        user.company = newCompany._id;
        await user.save();


        res.status(201).json({
        success: true,
        message: "Company created successfully",
        company: newCompany,
        });
        */
       const {name, description, website, location, logo} = req.body;
       const userId = req.user._id;

       const company = await companyModel.create({
        name,
        description,
        website,
        location,
        logo,
        //recruiter: req.user._id,
        userId
       });

       // update recruiter with company id 
       await userModel.findByIdAndUpdate(req.user._id,{company: company._id});

       //update request user
       req.user.company = company._id;
       await req.user.save();

       return res.status(201).json({
        message:"company created successfully",
        success: true,
        company
       });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "error creating company",
            success: false,
        });
    }
}

async function getRecruiterCompany(req,res){
    try {

    const company = await companyModel.findOne({userId: req.user._id}).populate("userId","username");

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json({
      company:{
        name:company.name,
        recruiter:company.userId?.username
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function updateComapny(req,res){
/* User must be logged in
 User must be recruiter
 Company must belong to that recruiter
 Then update company*/

    try{
        const companyId = req.params.id;

        const company = await companyModel.findById(companyId);

        if(!company){
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }
        // check recruiter owns this company or not
        if(company.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "you can update your own company",
                success: false,
            });
        }

        // now update the data

        const {name, description, website, location, logo } = req.body;

        if(name) company.name = name;
        if(description) company.description = description;
        if(website) company.website = website;
        if(location) company.location = location;
        if(logo) company.logo = logo;

        await company.save();

        return res.status(200).json({
            message: "company updated successfully",
            success: true,
            company,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "error updating company",
            success: false,
        });
    }
}


async function createJob(req,res){
 try {

    const { title, description, requirements, location, jobType, salary, position } = req.body;

    const recruiterId = req.user._id;

    //check company of recruiter
    const company = await companyModel.findOne({
      userId: recruiterId
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found. Please create a company first"
      });
    }

    // create job
    const newJob = new jobModel({
      title,
      description,
      requirements,
      location,
      jobType,
      salary,
      position,
      company: company._id,
      createdBy: recruiterId
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}

async function updateJobById(req,res){
    try{
        // get job id from params --- jobId in url too
        const jobId = req.params.jobId;
        const userId = req.user._id;// from middleware
        console.log(jobId);

        const user = await userModel.findById(userId); // user here
        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }
        // get job id
        const job = await jobModel.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success: false,
            })
        }
        // check company exist or not 
        if(!user.company || !job.company){
            return res.status(400).json({
                message: "company information missing",
                success: false
            })
        }
        // check job belog to user or not 
        if(job.company.toString() !== user.company.toString()){
            return res.status(403).json({
                message: "You can only update jobs from your own company.",
                success: false,
            });
        }
        if(title) job.title = title;
        if(description) job.description = description;
        if(requirements) job.requirements = requirements;
        if(location) job.location = location;
        if(jobType) job.jobType = jobType;
        if(salary) job.salary = salary;
        if(position) job.position = position;


        await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            success: false,
            job
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

async function deleteJobById(req,res){
    try{
        const jobId = req.params.jobId;

        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            });
        }
        // check logged-in user is the owner of the job
        if(job.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "you can delete only your job",
                success: false,
            });
        }
        // delete job
        await jobModel.findByIdAndDelete(jobId);

        return res.status(200).json({
            message:"job deleted successfully",
            success: true,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "serevr error",
            success: false,
        });
    }
}

async function get_jobs(req,res){
    try{
        const jobs = await jobModel.find({createdBy: req.user._id}).populate("createdBy","username").populate("company","name");

        return res.status(200).json({
            message: "job fetched successfully",
            success: true,
            jobs,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        });
    }
}

async function  getApplicants(req,res){
    try{
        const jobId = req.params.jobId;
        const recruiterId = req.user._id;

        //check if job exists or not
        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            });
        }
        // make sure this recruiter only owns this job
        if(job.createdBy.toString() !== recruiterId.toString()){
            return res.status(403).json({
                message: "you are not authorized to view applicants for this job",
                success: false,
            });
        }
        // get all applicants
        const applicants = await applicationModel.find({job: jobId})
            .populate({
                path: "applicant",
                select: "username email profile"
            })
            .populate({
                path: "job",
                select: "title"
            })
            .sort({createdAt: -1});

        return res.status(200).json({
            message:"applicants fetched successfully",
            totalApplicants: applicants.length,
            applicants,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        });
    }
}

async function updateApplicationStatus(req,res){
    try{
        const {applicationId} = req.params;
        const {status} = req.body;

        // validate status
        const allowedStatus = ["pending","accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: "invalid status value",
                success: false,
            });
        }
        const application = await applicationModel.findById(applicationId).populate("job").populate("applicant");

        if(!application){
            return res.status(404).json({
                message: "application not found",
                success: false,
            });
        }

        //make sure recruiter owns this job
        if(application.job.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "not authorized",
                success: false,
            });
        }

        application.status = status;
        await application.save();

        // send  email to applicant 
        await sendApplicationStatusEmail(application.applicant.email,application.applicant.username,application.job.title,status);

        return res.status(200).json({
            success: true,
            message: "application status updated successfully",
            application,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        });
    }
}

async function getAllApplicants(req, res) {
    try {
        const recruiterId = req.user._id;

        // 1. Find all jobs posted by this recruiter
        const myJobs = await jobModel.find({ createdBy: recruiterId }).select("_id");
        const jobIds = myJobs.map(job => job._id);

        // 2. Find all applications for these jobs
        const applicants = await applicationModel.find({ job: { $in: jobIds } })
            .populate({
                path: "applicant",
                select: "username email profile"
            })
            .populate({
                path: "job",
                select: "title company",
                populate: { path: "company", select: "name" }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All applicants fetched successfully",
            totalApplicants: applicants.length,
            applicants,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error",
            success: false,
        });
    }
}

module.exports = {getRecruiterProfile,createCompany,getRecruiterCompany,updateComapny,createJob, updateJobById,deleteJobById , get_jobs, getApplicants,getAllApplicants,updateApplicationStatus};

