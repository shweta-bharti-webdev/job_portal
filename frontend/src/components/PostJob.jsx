import { useState } from "react";
import axios from "axios";
import "./PostJob.css";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    salary: "",
    position: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!job.title || !job.description || !job.location || !job.jobType || !job.salary || !job.position) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please login again.");
        return;
      }

      // Convert salary and position to numbers as required by Backend Model
      const jobData = {
        ...job,
        salary: Number(job.salary),
        position: Number(job.position)
      };

      const res = await axios.post(
        "http://localhost:3000/api/recruiter/job",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        alert("Job Posted Successfully");
        // Reset form
        setJob({
          title: "",
          description: "",
          requirements: "",
          location: "",
          jobType: "",
          salary: "",
          position: ""
        });
      }

    } catch (error) {
      console.error("Error posting job:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error Posting Job");
    }
  };

  return (
    <div className="postjob-container">
      <h2>Post Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <input name="title" value={job.title} placeholder="Job Title" onChange={handleChange} required />
        <input name="location" value={job.location} placeholder="Location" onChange={handleChange} required />
        <input name="jobType" value={job.jobType} placeholder="Job Type (e.g. Full-time)" onChange={handleChange} required />
        <input name="salary" value={job.salary} type="number" placeholder="Salary" onChange={handleChange} required />
        <input name="position" value={job.position} type="number" placeholder="Number of Positions" onChange={handleChange} required />

        <textarea name="description" value={job.description} placeholder="Job Description" onChange={handleChange} required />
        <textarea name="requirements" value={job.requirements} placeholder="Requirements (Optional)" onChange={handleChange} />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;