// 


import {useEffect,useState} from "react";
import axios from "axios";

function MyJobs(){

const [jobs,setJobs] = useState([]);

useEffect(()=>{

const fetchJobs = async()=>{

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:3000/api/recruiter/my_jobs",
{
headers:{
Authorization: `Bearer ${token}`
}
}
);

setJobs(res.data.jobs);

};

fetchJobs();

},[]);

return(

<div>

<h2>My Posted Jobs</h2>

{jobs.map(job=>(
<div key={job._id}>

<h3>{job.title}</h3>
<p>{job.location}</p>
<p>{job.salary}</p>

</div>
))}

</div>

);

}

export default MyJobs;