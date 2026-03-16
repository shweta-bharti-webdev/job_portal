import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  /*
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

    const user  = res.data;
    console.log(user);
    
    if(user.role === "recruiter"){
      navigate("/recruiter/dashboard");
    }
    else if(user.role === "user"){
      navigate("/profile")
    }
    else if(user.role === "admin"){
      navigate("/admin/dashboard")
    }

    const data = await res.json();

    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } else {
      alert(data.message);
    }

    } catch (error) {
      console.log(error);
    }
  };*/
  const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    const data = await res.json();

    console.log("Login response:", data);

    const role = data.user?.role;

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id);

    }

    if (role === "recruiter") {
      navigate("/recruiter/dashboard");
    }
    else if (role === "user") {
      navigate("/profile");
    }
    else if (role === "admin") {
      navigate("/admin/dashboard");
    }
    else {
      alert("Role not found");
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;