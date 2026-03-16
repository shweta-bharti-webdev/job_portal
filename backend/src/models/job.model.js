const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "company",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true
    },
    applications: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "application",
    }
},{timestamps: true});

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;