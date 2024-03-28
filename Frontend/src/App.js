import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar';
import Registration from './Components/BasicReg';
import {store,persistor} from './App/store';
import Login from './Components/Login';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import FindJobs from './Components/FindJobs';
import Applications from './Components/Applications';
import Notifications from './Components/Notifications';
import BasicReg from './Components/BasicReg';
import Profile from './Components/profile';
import JobList from './Components/JobList';
import ApplyJobs from './Components/ApplyJobs';
import ApplyForm from './Components/ApplyForm';
import Applied from './Components/Applied';
import SavedJobs from './Components/SavedJobs';
import { Provider } from 'react-redux';
import Interview from './Components/Interview';
import Landing from './Components/landing';
import Select from './Components/select';
import HRreg from './Components/Hrregistration';
import HrDashboard from './Components/HrDashboard';
import Jobshr from './Components/Jobshr';
import Editjob from './Components/editjob';
import Addjob from './Components/Addjob';
import ScheduleInterview from './Components/SheduleInterview';
import JobApplied from './Components/JobApplied';
import UserApplied from './Components/userApplied';
import HRLogin from './Components/hrlogin';
import FeedbackForm from './Components/feedback';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/select' element={<Select/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Basic" element={<BasicReg/>}/>
        <Route path="/registration" element={<BasicReg/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/findjobs" element={<FindJobs/>}/>
        <Route path="/myApplications" element={<Applications/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/jobs" element={<JobList/>}/>
        <Route path="/apply" element={<ApplyJobs/>}/>
        <Route path="/applyForm" element={<ApplyForm/>}/>
        <Route path="/applied" element={<Applied/>}/>
        <Route path="/savedJobs" element={<SavedJobs/>}/>
        <Route path="/Interviews" element={<Interview/>}/>
        <Route path="/HRregistration" element={<HRreg/>}/>
        <Route path="/HrDashboard" element={<HrDashboard/>}/>
        <Route path="/joblist" element={<Jobshr/>}/>
        <Route path="/editjob" element={<Editjob/>}/>
        <Route path="/addjob" element={<Addjob/>}/>
        <Route path="/schedule" element={<ScheduleInterview/>}/>
        <Route path="/JobsApplied" element={<JobApplied/>}/>
        <Route path="/userApplied" element={<UserApplied/>}/>
        <Route path="/hrlogin" element={<HRLogin/>}/>
        <Route path="/feedback" element={<FeedbackForm/>}/>
      </Routes>
      </BrowserRouter>
      
      
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
