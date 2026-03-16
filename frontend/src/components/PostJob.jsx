// 


import { useState } from "react";
import axios from "axios";
import "./PostJob.css";

function PostJob(){

const [job,setJob] = useState({
title:"",
description:"",
requirements:"",
location:"",
jobType:"",
salary:"",
position:""
});

const handleChange=(e)=>{
setJob({...job,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();

try{

const token = localStorage.getItem("token");

await axios.post(
"http://localhost:3000/api/recruiter/job",
job,
{
headers:{
Authorization: `Bearer ${token}`
}
}
);

alert("Job Posted Successfully");

}catch(error){
console.log(error);
alert("Error Posting Job");
}

};

return(

<div className="postjob-container">

<h2>Post Job</h2>

<form onSubmit={handleSubmit} className="job-form">

<input name="title" placeholder="Job Title" onChange={handleChange}/>
<input name="location" placeholder="Location" onChange={handleChange}/>
<input name="jobType" placeholder="Job Type" onChange={handleChange}/>
<input name="salary" placeholder="Salary" onChange={handleChange}/>
<input name="position" placeholder="Position" onChange={handleChange}/>

<textarea name="description" placeholder="Description" onChange={handleChange}/>
<textarea name="requirements" placeholder="Requirements" onChange={handleChange}/>

<button type="submit">Post Job</button>

</form>

</div>

);

}

export default PostJob;