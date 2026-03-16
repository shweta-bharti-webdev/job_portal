const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "recruiter", "admin"],
        default: "user"
    },
    profile: {
        bio: {type: String},
        skills: {type: String},
        resume: {type: String},// URL to resume
        resumeOriginalName: {type: String},
        profilePhoto: {
            type: String,
            default: ""
        }
    },
    company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company"
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {timestamps : true});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;