  import React, { useEffect, useState } from 'react';
  import hiring from "../Assets/images/Hiring.png"
  import "../Assets/Styles/ApplyForm.css";
  import Navbar from './navbar';
  import axios from 'axios';
  import Footer from './Footer';
  import Snackbar from './snackbar';

  const ApplyForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');
    const [errors, setErrors] = useState({});
    const[job,setJob]=useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');
    const [notificationData, setNotificationData] = useState({
      title: '',
      message: '',
      date: new Date(), // You can initialize the date as per your requirements
    });
  const notification={
      title:"",
      message:"",
      date:new Date()
    }
    const userId=localStorage.getItem("userId");
    const token=localStorage.getItem("token");
    useEffect(()=>{
      const fetchData=async()=>{
        console.log(token);
        try{
          const response=await axios.get(
            `http://localhost:8080/api/v1/users/email/${localStorage.getItem("email")}`,
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
        const name=response.data.firstName+" "+response.data.lastName;
        setName(name);
        setEmail(response.data.email);
        console.log(response.data);

          const response3=await axios.get(`http://localhost:8080/api/v1/jobDetails/${jobId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        )
        setJob(response3.data);
        const jobtitle=response3.data.title;
        console.log(job.role);
        }
        catch(error){
          console.log("Error fetching Data"+error);
        }
      };
      fetchData();
    },[]);
    const handleNameChange = (event) => {
      setName(event.target.value);
      clearError(event.target.name);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      clearError(event.target.name);
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
    
    const jobId=localStorage.getItem("jobId");
    
    const uploadFile = async () => {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'uaonee3a');
    
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/digpxlioq/upload',
          formData
        );
        console.log(response.data);
        const url_res=`https://res.cloudinary.com/digpxlioq/raw/upload/v${response.data.version}/${response.data.public_id}`;
        const res=await axios.post(`http://localhost:8080/api/v1/apply`,{
          jobId :jobId,
          userId:userId,
          resumeLink:url_res,
        },
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        )
        // Save the uploaded file URL to state
        setUploadedFileUrl(response.data.secure_url);
        console.log(uploadedFileUrl); 
        
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    

    const handleSubmit = async(event) => {
      event.preventDefault();
      const errors = {};
      
      // Validate name
      if (name.trim() === '') {
        errors.name = 'Name is required';
      }

      // Validate email
      if (email.trim() === '') {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Email is invalid';
      }

      // Validate resume file
      if (selectedFile) {
        uploadFile();
      } else {
        errors.selectedFile='Resume is required';
      } 

      if (Object.keys(errors).length === 0) {
        // Submit the form if there are no errors
        showSnackbar(`Job applied successfully!`, 'success');
        console.log('Form submitted successfully');
        setTimeout(()=>{
          window.location.href="/jobs";
        },1000);

        setSelectedFile(null);
        setErrors({});
        const jobTitle = job.title;

        
        notificationData.title = `Application for ${job.role}`;
        notificationData.message = `You have applied for the job: ${job.role}`;
        // Send the notification
        await handleNotification(notificationData);
    
        showSnackbar(`Job applied successfully!`, 'success');
        console.log('Form submitted successfully');
        setTimeout(() => {
          window.location.href = "/jobs";
        }, 10000);
    
        
        
        // window.location.href="/jobs";
      } else {
        // Update errors state if there are validation errors
        setErrors(errors);
      }
    };
    const handleNotification = async (e) => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/notifications', notificationData,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

          // Notification successfully added to the table
      console.log('Notification added:', response.data);
      } catch (error) {
        console.error('Error adding notification:', error);
      }
    }

    const clearError = (fieldName) => {
      const updatedErrors = { ...errors };
      delete updatedErrors[fieldName];
      setErrors(updatedErrors);
    };
    const showSnackbar = (message, type) => {
      setSnackbarMessage(message);
      setSnackbarType(type);
      setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    return (
      <>
      <Navbar/>
      <div id="mainframe">
      <div id="imageapply">
          <img src={hiring} height="550px" width="550px" id="hire"></img>
      </div>
      <div id="applyForm">
        <form onSubmit={handleSubmit}>
        <h2>Apply For the Job</h2>
          <div>
              <input type="text" 
              value={name}
              name="name"
              className='input'
              placeholder="Full Name"
              onChange={handleNameChange} 
              readOnly/>
            {errors.name && <p className='errors'>{errors.name}</p>}
          </div>
          <div>
              <input type="email" 
              className='input' 
              value={email} 
              name="email"
              placeholder="Email"
              onChange={handleEmailChange} 
              readOnly/>
            {errors.email && <p className='errors'>{errors.email}</p>}
          </div>
          <div>
          <label htmlFor="file-upload" className="custom-file-upload">
              <input type="file" onChange={handleFileChange} name="resume" className='input'
            />
            {errors.resume && <p className='errors'>{errors.resume}</p>}
              </label>
          </div>
          <button type="submit" id="formsub">Submit</button>
        </form>
      </div>
      <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
            type={snackbarType}
            onClose={handleCloseSnackbar}
          />
      </div>
      <Footer/>
      </>
    );
  };

  export default ApplyForm;
