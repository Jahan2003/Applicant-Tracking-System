    import React, { useState } from "react";
    import Navbar from "./navbar";
    import location from "../Assets/images/location.png";
    import { FcBriefcase } from "react-icons/fc";
    import { FaRupeeSign } from "react-icons/fa";
    import ApplyForm from "./ApplyForm";
    import "../Assets/Styles/ApplyJobs.css";
    import { Link, useParams } from "react-router-dom";
    import {TiTick} from "react-icons/ti";
    import Footer from "./Footer";
    import { useEffect } from "react";
    import axios from "axios";

    import "../Assets/Styles/Application.css";
    function Applied(){
        const [apply, setApply] = useState(false);
    const [job, setJob] = useState({});
    const jobId = localStorage.getItem("jobId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/jobDetails/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setJob(response.data); // Set the job object with fetched data
        } catch (error) {
            console.log('Error fetching Data ' + error);
        }
        };

        fetchData();
    }, []);

    if (Object.keys(job).length === 0) {
        return <p>Loading...</p>; // Display a loading message until the data is fetched
      }
    const resp=job.responsibilities.split(".");
    const req=job.requirements.split(".");

        return(
            <>
        <Navbar/>
        <div class="apply">
        <div id="container">
        <div id="container1">
        <div className="job-cardj" key={job.id}>
            <p id="jobtitle" style={{fontSize:"25px"}}>{job.role}</p>
                <div id="textapp">
                    <div id="applied"><p>Applied</p></div>
                    <TiTick id="tick" className="icon"/>
                </div>
            
            <p className="company">{job.company}</p>
            <div id="detls">
            <div className="container">
      <div className="hoverable-element">
      <a style={{color:"black",cursor:"pointer"}}><p className="location"><img src={location} height="15px" width="15px"/> {job.location}</p></a>
        <div className="popup">
        <div class="mapouter"><div class="gmap_canvas">
          <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://maps.google.com/maps?width=328&height=308&hl=en&q=${encodeURIComponent(job.address)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe><a href="https://connectionsgame.org/">Connections Game</a></div></div>
        </div>
      </div>
    </div>
            <p className="location"><img src={location} height="15px" width="15px"/> {job.location}</p>
            <p className="workExp"><FcBriefcase fontSize={18} className='icons'/>{job.exp}yrs</p>
            <p className="salary"><FaRupeeSign className='icons'/>{job.salary}</p>
            </div>
        <div id="des">
            <div className="header">
                Job description
            </div>
            <div id="job-des">
                <p class="text-data">
                    {job.des}
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
        </>
        );
    }
    export default Applied;


