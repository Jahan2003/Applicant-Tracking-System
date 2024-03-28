import React, { useState } from "react";
import Navbar from "./navbar";
import location from "../Assets/images/location.png";
import { FcBriefcase } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";
import ApplyForm from "./ApplyForm";
import { useEffect } from "react";
import axios from "axios";
import "../Assets/Styles/ApplyJobs.css";
import { Link, useParams } from "react-router-dom";
import {TiTick} from "react-icons/ti";
import Footer from "./Footer";

function ApplyJobs(props){
    const[apply,setApply]=useState(false);
    const [Jobdata,setJobdata]=useState({
      role:"",
      company:"",
      des:"",
      location:"",
      address:"",
      exp:"",
      salary:"",
      responsibilitis:"",
      requirements:"",
    })
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      const jobId=localStorage.getItem('jobId');
      const fetchData = async () => {
         try {
          const response = await axios.get(`http://localhost:8080/api/v1/jobDetails/${jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setJobdata({
            role:response.data.role,
            company:response.data.company,
            des:response.data.des,
            location:response.data.location,
            address:response.data.address,
            exp:response.data.exp,
            salary:response.data.salary,
            responsibilitis:response.data.responsibilities,
            requirements:response.data.requirements
          })

          

          } catch (error) {
            console.log('Error fetching Data ' + error);
          }
        };
    
        fetchData();
      }, []);

      const resp=Jobdata.responsibilitis.split(".");
      const req=Jobdata.requirements.split(".");

    return(
        <div class="apply">
        <Navbar/>
     <div id="container">
     <div id="container1">
     <div className="job-cardj" >
          <p id="jobtitle" style={{fontSize:"25px"}}>{Jobdata.role}</p>
        <button id="viewbtn" onClick={()=>{
          window.location.href="/applyForm"
        }}>Apply Now</button>
          <p className="company">{Jobdata.company}</p>
          <div id="detls">
          <div className="container">
      <div className="hoverable-element">
      <a style={{color:"black",cursor:"pointer"}}><p className="location"><img src={location} height="15px" width="15px"/> {Jobdata.location}</p></a>
        <div className="popup">
        <div class="mapouter"><div class="gmap_canvas">
          <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?width=328&height=308&hl=en&q=${encodeURIComponent(Jobdata.address)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe><a href="https://connectionsgame.org/">Connections Game</a></div></div>
        </div>
      </div>
      </div>
          <p className="workExp"><FcBriefcase fontSize={18} className='icons'/>{Jobdata.exp}yrs</p>
          <p className="salary"><FaRupeeSign className='icons'/>{Jobdata.salary}</p>
          </div>
     <div id="des">
        <div className="header">
            Job description
        </div>
        <div id="job-des">
            <p class="text-data">
              {Jobdata.des}
             </p>
        </div>
        <div className="header">
            Responsibilities
        </div>
        <div id="job-res">
            <p class="text-data">
                <ul>
                {
                  resp.map((data)=>(
                  <li>{data+"."}</li>
                  ))
                }
                </ul>
           
            </p>
        </div>
        <div className="header">
           Requirements
        </div>
        <div id="job-res">
            <p class="text-data">
            <ul>
                {
                  req.map((data)=>(
                  <li>{data+"."}</li>
                  ))
                }
                </ul>
            </p>
        </div>
        
     </div>
    </div>
     </div>
     </div>
     <Footer/>
    </div>
    );
}
export default ApplyJobs;


