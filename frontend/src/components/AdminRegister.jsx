import { useState } from "react";
import axios from "axios";
import "../components/AdminRegister.css";
import { useNavigate } from "react-router-dom";


function AdminRegister() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/register",
        formData
      );

      alert("Admin Registered Successfully");
      navigate("/admin/dashboard")

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };


return (

<div className="admin-register-container">

<form className="admin-register-box" onSubmit={handleSubmit}>

<h2>Admin Register</h2>

<input
type="text"
name="username"
placeholder="Enter Username"
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Enter Email"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Enter Password"
onChange={handleChange}
required
/>

<input
type="text"
name="adminKey"
placeholder="Enter Admin Key"
onChange={handleChange}
required
/>

<button type="submit">Register Admin</button>

</form>

</div>

);

}

export default AdminRegister;
