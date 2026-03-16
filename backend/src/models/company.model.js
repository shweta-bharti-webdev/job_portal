const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location :{
        type: String,
    },
    logo: {
        type: String //URL of company logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // recruiter id should be there as it is also a user
        required:true
    }
},{timestamps: true});

const companyModel = mongoose.model("company",companySchema);

module.exports = companyModel;