import React from "react";
import Navbar from "./navbar";
import "../Assets/Styles/Dashboard.css"
import hi from "../Assets/images/hi.png"
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Features/userSlice";
import Overview from "./overview";
import Recentjob from "./recentjobs";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
function DashBoard(){
const user=useSelector((state)=>state.user);
const mail=user.email;
const name=mail.substr(0,mail.indexOf('@'));
const email=localStorage.getItem("email");
const token=localStorage.getItem("token");
useEffect(()=>{
    const fetchData=async()=>{
try{
    const response= await axios.get(
      `http://localhost:8080/api/v1/users/email/${email}`,
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
    console.log(response.data);
    localStorage.setItem("userId",response.data.id);
}catch(error){
    console.log(error);
}
    }},[])

return(
    <div class="dash">
    <Navbar/>
    <div id="greeting">
        <p id="msg">
        Welcome Back <span id="name">{name}</span>
        <img src={hi} width="35px" height="35px"  id="hi"></img>
        </p>
    </div>
    <Overview/>
    <Recentjob/>
    <Footer/>
    </div>
)
}
export default DashBoard;