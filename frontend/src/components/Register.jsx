import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../components/Register.css";

 function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange =(e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username || !formData.email || !formData.password || !formData.role) {
    alert("Please fill all the fields");
    return;
  }

  // Clear any existing session data to prevent role-bleeding from previous sessions
  localStorage.clear();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData
    );

    if (res.data) {
      // We don't store token here because backend only sends it on Login
      alert("Registration Successful! Please login to your new account.");
      navigate("/login"); 
    }

  } catch (error) {
    console.log(error.response);
    alert(error.response?.data?.message || "Registration failed");
  }
};
  return (
    <div className="register-container">
      <form className="signup-form" onSubmit={handleSubmit}>

        <h2>Signup / Register</h2>

        <input type="text" name="username" placeholder="Enter Username" onChange={handleChange} required/>

        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}  required/>

        <input type="password" name="password" placeholder="Enter Password"  onChange={handleChange} required/>

        <div className="role-select">
        <label>Select Role :</label>

        <input type="radio" name="role" value="user" onChange={handleChange}/> User

        <input type="radio" name="role" value="recruiter" onChange={handleChange}/> Recruiter

        </div>

        <button type="submit">Signup</button>

      </form>
    </div>
  );

}

export default Register;