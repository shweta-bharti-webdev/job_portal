import {useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import "./UpdateCompany.css";

function UpdateCompany(){

const {id} = useParams();
const navigate = useNavigate();

const [company,setCompany] = useState({
name:"",
description:"",
website:"",
location:"",
logo:""
});

useEffect(()=>{
fetchCompany();
},[]);

const fetchCompany = async ()=>{

try{

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:3000/api/recruiter/company/${id}",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCompany(res.data.company);

}catch(error){
console.log(error);
}

};

const handleChange = (e)=>{

setCompany({
...company,
[e.target.name]:e.target.value
});

};

const handleSubmit = async(e)=>{
e.preventDefault();

try{

const token = localStorage.getItem("token");

await axios.put(
"http://localhost:3000/api/recruiter/company/${id}",
company,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

alert("Company updated successfully");

navigate("/recruiter/post-company");

}catch(error){
console.log(error);
}

};

return(

<div className="update-page">

<h1 className="heading">Update Company</h1>

<div className="update-box">

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
value={company.name}
onChange={handleChange}
placeholder="Company Name"
/>

<input
type="text"
name="description"
value={company.description}
onChange={handleChange}
placeholder="Description"
/>

<input
type="text"
name="website"
value={company.website}
onChange={handleChange}
placeholder="Website"
/>

<input
type="text"
name="location"
value={company.location}
onChange={handleChange}
placeholder="Location"
/>

<input
type="text"
name="logo"
value={company.logo}
onChange={handleChange}
placeholder="Logo URL"
/>

<button type="submit">
Save Changes
</button>

</form>

</div>

</div>

)

}

export default UpdateCompany;