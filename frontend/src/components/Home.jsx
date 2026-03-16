import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

  const jobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "₹12 LPA",
  },
  {
    title: "Backend Developer",
    company: "Amazon",
    location: "Bangalore",
    salary: "₹15 LPA",
  },
  {
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Hyderabad",
    salary: "₹18 LPA",
  },
];

function Home() {
  return (
    <div>

    {/* Navbar */}
      <nav className="navbar">

      <div className="logo">
        JobPortal
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="">Jobs</a></li>
        <li><a href="">Help</a></li>
        <li><a href="">Contact Us</a></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
        <Link to="/admin" className="admin-btn">Admin</Link>
      </div>

    </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Search thousands of jobs from top companies</p>

        <div className="searchBox">
          <input type="text" placeholder="Search job..." />
          <button>Search</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Popular Categories</h2>

        <div className="categoryContainer">
          <div className="card">Development</div>
          <div className="card">Design</div>
          <div className="card">Marketing</div>
          <div className="card">Data Science</div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="jobs">
        <h2>Featured Jobs</h2>

        <div className="jobContainer">
          {jobs.map((job, index) => (
            <div className="jobCard" key={index}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p className="salary">{job.salary}</p>
              <button className="applyBtn">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Start Your Career?</h2>
        <button>Get Started</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;

