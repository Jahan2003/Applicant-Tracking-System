import React from "react";
import Navbar from "./navbar";
import { useState } from "react";
import "../Assets/Styles/Notifications.css";
import axios from "axios";
import { useEffect } from "react";
import Footer from "./Footer";
function Notifications(){
   const [Notifications, setNotifications] = useState([]);
   useEffect(() => {
      const token = localStorage.getItem('token');
      const notifications = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/notifications`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotifications(response.data);
          console.log(response.data);

          } catch (error) {
            console.log('Error fetching Data ' + error);
          }
        };
        notifications();
      }, []);
      const getTimeAgo = (iso8601Timestamp) => {
         const now = new Date();
         const timestamp = new Date(iso8601Timestamp);
         const diff = now - timestamp;
       
         // Calculate time difference in minutes, hours, or days
         const minutes = Math.floor(diff / (1000 * 60));
         const hours = Math.floor(diff / (1000 * 60 * 60));
         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
       
         if (minutes < 60) {
           return minutes + " min ago";
         } else if (hours < 24) {
           return hours + " hr ago";
         } else {
           return days + " days ago";
         }
       };
       
       
   return(
   <>
    <Navbar/>
    <div id="notification">
      <div id="title-notification">
         <p>Notification</p>
      </div>
    {Notifications.map((Notification) => (
      <div id="noti">
      <div id="head">
      <div className="dot"></div>
      <p id="notificationhead">
       {Notification.title}
      </p>
      </div>
      <div id="description">
         <p id="notificationtext">
         {Notification.message}
         </p>
      </div>
      <div id="time">
         <p id="notificationtime">
            {getTimeAgo(Notification.date)}
         </p>
      </div>
      </div>
    ))}
    </div>
    <Footer/>
    </>
   )
}
export default Notifications;