import {useState} from "react";
import axios from "axios";

function Applicants(){

const [jobId,setJobId] = useState("");
const [applicants,setApplicants] = useState([]);

const fetchApplicants = async()=>{

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:3000/api/recruiter/applicants/${jobId}",
{
headers:{
Authorization: `Bearer ${token}`
}
}
);

setApplicants(res.data.applicants);

};

return(

<div>

<h2>Applicants</h2>

<input
placeholder="Enter Job ID"
onChange={(e)=>setJobId(e.target.value)}
/>

<button onClick={fetchApplicants}>Get Applicants</button>

{applicants.map(app=>(
<div key={app._id}>
<p>{app.user.name}</p>
<p>{app.status}</p>
</div>
))}

</div>

);

}

export default Applicants;