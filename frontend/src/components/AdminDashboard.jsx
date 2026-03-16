import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {

const navigate = useNavigate();

const routes = [

{title:"Register Admin", path:"/admin/register"},
{title:"All Users", path:"/admin/users"},
{title:"User By ID", path:"/admin/user"},
{title:"Delete User", path:"/admin/user/delete"},
{title:"Toggle User Block", path:"/admin/user/toggle"},
{title:"All Recruiters", path:"/admin/recruiters"},
{title:"Recruiter By ID", path:"/admin/recruiter"},
{title:"Delete Recruiter", path:"/admin/recruiter/delete"},
{title:"Toggle Recruiter Block", path:"/admin/recruiter/toggle"}

];

return (

<div className="admin-container">

{/* LEFT CARTOON */}

<div className="admin-left">

<img
src="https://cdni.iconscout.com/illustration/premium/thumb/team-management-4483534-3723277.png"
alt="cartoon admin"
/>

<h2>Admin Control Panel</h2>

<p>
Manage users, recruiters and platform security.
</p>

</div>


{/* RIGHT */}

<div className="admin-right">

<h1>Admin Dashboard</h1>

<div className="admin-cards">

{routes.map((item,index)=>(
<div
key={index}
className="admin-card"
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

export default AdminDashboard;
