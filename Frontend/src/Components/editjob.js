import React from "react";
import NavbarHr from "./Navbarhr";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skillselect from "./skillselect";
import {AiFillSave} from "react-icons/ai";
import "../Assets/Styles/editjob.css";
import { useEffect } from "react";
import axios from "axios";
function Editjob(){
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        location: '',
        address: '',
        salary: '',
        exp: '',
        responsibilities:'',
        requirements:'',
      });
    
      const [errors, setErrors] = useState({});
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        clearError(e.target.name)
      };
    
      const token=localStorage.getItem("token");
      const jobId=localStorage.getItem("jobId");  
      useEffect(()=>{
        const fetchData=async()=>{
          console.log(token);
          console.log(jobId);
          try{
            const response=await axios.get(
              `http://localhost:8080/api/v1/jobDetails/${jobId}`,
              {
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Credentials': 'true',
                  "Authorization":`Bearer ${token}`,
                  "cache-control":"no-cache",
                },
              }
            )
            setFormData({
              role:response.data.role,
              company:response.data.company,
              location:response.data.location,
              address:response.data.address,
              salary:response.data.salary,
              exp:response.data.exp,
              responsibilities:response.data.responsibilities,
              requirements:response.data.requirements,
            })
            console.log(response.data);
          }
          catch(error){
            console.log("Error fetching Data"+error);
          }
        };
        fetchData();
       },[]);


      const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
          // Submit the form or perform further actions
          console.log('Form submitted:', formData);
          try{
          const response=await axios.put( `http://localhost:8080/api/v1/jobDetails/${jobId}`,
          formData,
          {
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization":`Bearer ${token}`,
              "cache-control":"no-cache",
            },
          })
          window.location.href="/joblist";
        }catch(error){
          console.log(error);
        }
        }
      };
      const clearError = (fieldName) => {
        const updatedErrors = { ...errors };
        delete updatedErrors[fieldName];
        setErrors(updatedErrors);
      };
      const validateForm = () => {
        let isValid = true;
        let newErrors = {};
    
        if (!formData.role) {
          newErrors.role = 'Job Title is required.';
          isValid = false;
        }
    
        if (!formData.company) {
          newErrors.company = 'Company Name is required.';
          isValid = false;
        }
    
        if (!formData.address) {
          newErrors.address = 'Address is required.';
          isValid = false;
        }
    
        if (!formData.location) {
          newErrors.location= 'Location is required';
          isValid = false;
        } 
    
        if (!formData.salary) {
          newErrors.salary = 'salary is required.';
          isValid = false;
        } else if (formData.salary < 0) {
          newErrors.salary = 'Invalid Salary.';
          isValid = false;
        }
    
        if (!formData.exp) {
          newErrors.exp = 'Experience is required.';
          isValid = false;
        } else if (formData.exp<0) {
          newErrors.exp = 'Invalid Experience.';
          isValid = false;
        }
        
        if (!formData.responsibilities) {
          newErrors.responsibilities = 'Responsibilities are required.';
          isValid = false;
        }

        if (!formData.requirements) {
          newErrors.requirements= 'Requirements are required.';
          isValid = false;
        }        
        setErrors(newErrors);
        return isValid;
      };
    
      
 return(
    <div id="addjob-cont">
        <NavbarHr/>
        <div className="registration" id="add-job">
    <form onSubmit={handleSubmit}>
      <div id="frame">
        
        <div id="form">
        <div id="reg">
        <p id="regis">Edit Job</p></div>
          <div id="name">
          <div id="fname">
          <input
            type="text"
            id="firstName"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Job Title"
          />
          {errors.role && <div className="error">{errors.role}</div>}
        </div>

        <div id="lname">
          <input
            type="text"
            id="lastName"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
          />
          {errors.company && <div className="error">{errors.company}</div>}
        </div>
          </div>
        <div id="emailid">
          <input
            type="text"
            id="email"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="location"
            size={20}
          />
          {errors.location && <div className="error">{errors.location}</div>}
        </div>

        <div id="add">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            size={20}
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        
        <div id="pass">
          <input
            type="text"
            id="password"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            size={20}
          />
          {errors.salary && <div className="error">{errors.salary}</div>}
        </div>
        <div id="no">
          <input
            type="tel"
            id="contactNumber"
            name="exp"
            value={formData.exp}
            onChange={handleChange}
            placeholder="Years of Experience"
            size={20}
          />
          {errors.exp && <div className="error">{errors.exp}</div>}
        </div>
        
        <div id="spec">
        <textarea
          type="textarea"
          rows={11}
          id="college"
          style={{fontSize:"14px",padding:"12px 12px",paddingLeft:"12px",fontFamily: "Avenir-Roman , sans-serif"}}
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Enter the Requirements"
          
        />
        {errors.requirements && <div className="error">{errors.requirements}</div>}
        </div>
        <div id="collg">
        <textarea
          type="text"
          id="college"
          rows={11}
          style={{fontSize:"14px",padding:"12px 12px",paddingLeft:"12px",fontFamily: "Avenir-Roman , sans-serif"}}
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="Enter the Responsibilities"

        />
        {errors.responsibilities && <div className="error">{errors.responsibilities}</div>}
        </div>
        <button type="submit" id="add">Save Job</button>
        </div>
        </div>
      </form>
    </div>
    </div>
 )
}
export default Editjob;