import { useState } from "react";
import axios from "axios";
import "./PostCompany.css";

function PostCompany() {

  const [companyData,setCompanyData] = useState({
    name:"",
    description:"",
    website:"",
    location:"",
    logo:"",
    createdBy:""
  });

  const [companies,setCompanies] = useState([]);

  const handleChange = (e)=>{

    setCompanyData({
      ...companyData,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    const newCompany = {
      ...companyData,
      createdAt:new Date().toLocaleDateString()
    };

    try{

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/recruiter/company",
        newCompany,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      localStorage.setItem("companyId",res.data.company._id);

      alert("Company Created Successfully");

      setCompanies([...companies,newCompany]);

      setCompanyData({
        name:"",
        description:"",
        website:"",
        location:"",
        logo:"",
        createdBy:""
      });

    }
    catch(error){

      console.log(error);

    }

  };

  return(

    <div className="page">

      <h1 className="heading">Create Company</h1>

      <div className="form-box">

        <form onSubmit={handleSubmit}>

          <input
          name="name"
          placeholder="Company Name"
          value={companyData.name}
          onChange={handleChange}
          />

          <input
          name="description"
          placeholder="Company Description"
          value={companyData.description}
          onChange={handleChange}
          />

          <input
          name="website"
          placeholder="Website"
          value={companyData.website}
          onChange={handleChange}
          />

          <input
          name="location"
          placeholder="Location"
          value={companyData.location}
          onChange={handleChange}
          />

          <input
          name="logo"
          placeholder="Logo URL"
          value={companyData.logo}
          onChange={handleChange}
          />

          <input
          name="createdBy"
          placeholder="Created By (Recruiter Name)"
          value={companyData.createdBy}
          onChange={handleChange}
          />

          <button type="submit">
            Create Company
          </button>

        </form>

      </div>


      {/* COMPANY LIST */}

      <div className="company-list">

        <h2>Your Companies</h2>

        {companies.map((company,index)=>(

          <div key={index} className="company-card">

            <img src={company.logo} alt="logo" className="logo"/>

            <div>

              <h3>{company.name}</h3>

              <p>{company.description}</p>

              <p>Website: {company.website}</p>

              <p>Location: {company.location}</p>

              <p>Created By: {company.createdBy}</p>

              <p>Date: {company.createdAt}</p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PostCompany;