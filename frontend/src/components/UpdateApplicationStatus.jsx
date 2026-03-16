import {useState} from "react";
import axios from "axios";

function UpdateApplicationStatus(){

const [applicationId,setApplicationId] = useState("");
const [status,setStatus] = useState("");

const updateStatus = async()=>{

const token = localStorage.getItem("token");

await axios.patch(
"http://localhost:3000/api/recruiter/application/${applicationId}/status",
{status},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

alert("Status Updated");

};

return(

<div>

<h2>Update Application Status</h2>

<input
placeholder="Application ID"
onChange={(e)=>setApplicationId(e.target.value)}
/>

<input
placeholder="Status (Accepted / Rejected)"
onChange={(e)=>setStatus(e.target.value)}
/>

<button onClick={updateStatus}>
Update Status
</button>

</div>

);

}

export default UpdateApplicationStatus;