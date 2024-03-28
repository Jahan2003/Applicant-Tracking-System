import React from "react";
import '../Assets/Styles/Registration.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar1 from "./navbar1";
import Skillselect from "./skillselect";
import reg from "../Assets/images/reg.png";
import axios from "axios";
function BasicReg(){
        const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          password: '',
          contactNumber: '',
          collegeName:'',
          degree:'',
          passingYear:'',
          cgpa:'',
          specializtion:'',
          exp:''
        });
      
        const [errors, setErrors] = useState({});
        const degrees = [
          'Associate of Arts (AA)',
          'Associate of Science (AS)',
          'Associate of Applied Science (AAS)',
          'Bachelor of Arts (BA)',
          'Bachelor of Science (BS)',
          'Bachelor of Fine Arts (BFA)',
          'Master of Arts (MA)',
          'Master of Science (MS)',
          'Master of Business Administration (MBA)',
          'Master of Fine Arts (MFA)',
          'Doctor of Philosophy (PhD)',
          'Doctor of Medicine (MD)',
          'Juris Doctor (JD)',
          'Bachelor of Laws (LLB)',
          'Bachelor of Engineering (BE)',
          'Bachelor of Technology (BTech)',
          'Master of Engineering (ME)',
          'Master of Technology (MTech)',
          'Diploma',
          'Certificate',
          'Other'
        ];
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
          clearError(e.target.name)
        };
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          if (validateForm()) {
            try{
              const response=await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                {
                  firstName:formData.firstName,
                  lastName:formData.lastName,
                  email:formData.email,
                  password:formData.password,
                  contactNumber:formData.contactNumber,
                  degree:formData.degree,
                  specializtion:formData.specializtion,
                  collegeName:formData.collegeName,
                  address:formData.address,
                  passingYear:formData.passingYear,
                  cgpa:formData.cgpa,
                  exp:formData.exp
                }
              );
              console.log(response.data);
              window.alert("Registration Sucessful");
              console.log('Form submitted:', formData);
              // Reset the form
              setFormData({
                firstName: '',
                lastName: '',
                address: '',
                email: '',
                password: '',
                contactNumber: '',
                collegeName:'',
                degree:'',
                passingYear:'',
                cgpa:'',
                specializtion:'',
                exp:''
              });
              setErrors({});
              window.location.href="/login";
            }catch(error){
              console.error(error);
            }
          
          }
        }
        const clearError = (fieldName) => {
          const updatedErrors = { ...errors };
          delete updatedErrors[fieldName];
          setErrors(updatedErrors);
        };
        const validateForm = () => {
          let isValid = true;
          let newErrors = {};
      
          if (!formData.firstName) {
            newErrors.firstName = 'First Name is required.';
            isValid = false;
          }
      
          if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required.';
            isValid = false;
          }
      
          if (!formData.address) {
            newErrors.address = 'Address is required.';
            isValid = false;
          }
      
          if (!formData.email) {
            newErrors.email = 'Email is required.';
            isValid = false;
          } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format.';
            isValid = false;
          }
      
          if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
          } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            isValid = false;
          }
      
          if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact Number is required.';
            isValid = false;
          } else if (!validateContactNumber(formData.contactNumber)) {
            newErrors.contactNumber = 'Invalid contact number format.';
            isValid = false;
          }
          
          if (!formData.collegeName) {
            newErrors.collegeName = 'College Name is required.';
            isValid = false;
          }

          if (!formData.specializtion) {
            newErrors.specializtion= 'Specialization is required.';
            isValid = false;
          }

          if (!formData.passingYear) {
            newErrors.passingYear = 'PassingYear is required.';
            isValid = false;
          }else if (!validatePassYear(formData.passingYear)) {
            newErrors.passingYear = 'Invalid Year.';
            isValid = false;
          }
          if (!formData.degree) {
            newErrors.degree = 'Degree is required.';
            isValid = false;
          }

          if (!formData.cgpa) {
            newErrors.cgpa = 'CGPA is required.';
            isValid = false;
          }else if (!validateCgpa(formData.cgpa)) {
            newErrors.email = 'Invalid CGPA.';
            isValid = false;
          }

          if (!formData.exp) {
            newErrors.cgpa = 'Experience is required.';
            isValid = false;
          }else if (!validateExp(formData.exp)) {
            newErrors.email = 'Invalid Experirence';
            isValid = false;
          }
          setErrors(newErrors);
          return isValid;
        };
      
        const validateEmail = (email) => {
          // Regular expression for email validation
          const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailPattern.test(email);
        };
      
        const validateContactNumber = (contactNumber) => {
          // Regular expression for contact number validation
          const contactNumberPattern = /^\d{10}$/;
          return contactNumberPattern.test(contactNumber);
        };
        const validateCgpa= (cgpa)=>{
          if(cgpa<0 || cgpa>10){
            return false;
          }else{
            return true;
          }
        }
        const validateExp= (exp)=>{
          if(exp<0){
            return false;
          }else{
            return true;
          }
        }
        const validatePassYear = (passingYear) => {
          if(passingYear>2000 && passingYear<2023){
            return true;
          }else{
            return false;
          }
        }
      
    
 return(
    <>
    <Navbar1/>
    <div className="registration">
    <form onSubmit={handleSubmit}>
      <div id="frame">
        <div id="imgsection">
           <img src={reg} id="regimg"></img>
        </div>
        <div id="form">
        <div id="reg">
        <p id="regis">Registration</p></div>
          <div id="name">
          <div id="fname">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div id="lname">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
          </div>
        <div id="emailid">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            size={20}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div id="add">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Residential Address"
            size={20}
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        
        <div id="pass">
          <input
            type="password"
            maxLength="100"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            size={20}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div id="no">
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            size={20}
          />
          {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
        </div>
        <div id="deg">
        <select
          name="degree"
          id="degree"
          value={formData.degree}
          onChange={handleChange}
          
        >
          <option value="">Select Degree</option>
          {degrees.map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>
        {errors.degree&& <div className="error">{errors.degree}</div>}
        </div>
        <div id="spec">
        <input
          type="text"
          id="specialization"
          name="specializtion"
          value={formData.specializtion}
          onChange={handleChange}
          placeholder="Specialization"
          size={20}
        />
        {errors.specializtion && <div className="error">{errors.specializtion}</div>}
        </div>
        <div id="collg">
        <input
          type="text"
          id="college"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          placeholder="College Name"
          size={20}
        />
        {errors.collegeName && <div className="error">{errors.collegeName}</div>}
        </div>
        <div id="Pass">
        <input
          type="text"
          id="PassingYear"
          name="passingYear"
          value={formData.passingYear}
          onChange={handleChange}
          placeholder="Passing Year"
          size={20}
        />
        {errors.passingYear && <div className="error">{errors.passingYear}</div>}
        </div>
        <div id="cg">
        <input
          type="text"
          id="cgpa"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
          placeholder="CGPA"
          size={20}
        />
        {errors.cgpa && <div className="error">{errors.cgpa}</div>}
        </div>
        <div id="cg">
        <input
          type="number"
          id="cgpa"
          name="exp"
          value={formData.exp}
          onChange={handleChange}
          placeholder="Years of Experirence"
          size={20}
        />
        {errors.exp && <div className="error">{errors.exp}</div>}
        </div>
        <button type="submit" id="Register">Register</button>
        <div id="sigin">
        <p id="sitag">Already have an account? <Link to="/login" id="si">Sign In</Link></p>
        </div>
        </div>
        </div>
      </form>
    </div>
    </>
 )
}
export default BasicReg;