import React from "react";
import { useNavigate } from "react-router-dom";
import "./recruiterDashboard.css";

const RecruiterDashboard = () => {

const navigate = useNavigate();

const routes = [
{title:"Profile", path:"/recruiter/profile"},
{title:"Post Company", path:"/recruiter/post-company"},
{title:"Update Company", path:"/recruiter/update-company"},
{title:"Post Job", path:"/recruiter/post-job"},
{title:"My Posted Jobs", path:"/recruiter/my_jobs"},
{title:"Applicants List", path:"/recruiter/applicants/all"}, 
{title:"Update Status", path:"/application/update"}, 
];

return (

<div className="recruiter-container">

{/* LEFT CARTOON SIDE */}

<div className="recruiter-left">

<img
src="https://cdni.iconscout.com/illustration/premium/thumb/programmer-working-on-laptop-2040846-1731032.png"
alt="cartoon developer"
/>

<h2>Recruiter Workspace</h2>

<p>
Post jobs, manage applicants and build your dream team easily.
</p>

</div>


{/* RIGHT SIDE */}

<div className="recruiter-right">

<h1>Recruiter Dashboard</h1>

<div className="recruiter-cards">

{routes.map((item,index)=>(
<div
key={index}
className="recruiter-card"
onClick={()=>navigate(item.path)}
>

<h3>{item.title}</h3>

</div>
))}

</div>

</div>

</div>

);

};

export default RecruiterDashboard;
