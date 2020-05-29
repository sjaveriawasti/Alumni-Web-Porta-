import React, { Component } from 'react'

import './App.css';

import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import Route from 'react-router-dom/Route';
import Login from './Components/Login'
import Home from './Components/Home';
import Register from './Components/Register';
import Profile from './Components/Profile'

import { Redirect } from 'react-router-dom';
import Search from './Components/Search';
import EditProfile from './Components/EditProfile';
import Friends from './Components/Friends';
import ImageGallery from './Components/ImageGallery';
import Admin from './Components/Admin';
import CreateEvent from './Components/CreateEvent';
import Event from './Components/Events';
import Adminlogin from './Components/AdminLogin'
import AddJob from './Components/AddJobs'
import Jobs from './Components/Jobs'
import Groups from './Components/Groups'
import Survey from './Components/Survey'
import AdminSurvey from './Components/AdminSurvey'
import AdminRequest from './Components/AdminRequest'
import AddAlumni from './Components/AddAlumni'
import SearchJobAndEvents from './Components/SearchJobAndEvents'
import OpenGroup from './Components/OpenGroup'
import Notification from './Components/Notifications'
import SurveyReport from './Components/SurveyReport'
import AdminSurveyReport from './Components/AdminSurveyReport';
import Rollback from './Components/RollBackAlumni';

class App extends Component {
  render() {
    return (
     <Router>
       <Route path="/" exact strict component={()=>{return <Home/>}}/>
       <Route path="/login" exact strict component={()=>{return <Login/>}}/>
       <Route path="/register" exact strict component={()=>{return <Register/>}}/>
       <Route path="/profile" exact strict component={()=>{return <Profile />}}/>
       <Route path="/friendProfile/:cnic" exact strict component={()=>{
             const {cnic} = useParams();
            
             return <Profile id={cnic}/>
         }}/>
       <Route path="/search" exact strict component={()=>{return <Search />}}/>
       <Route path="/editprofile" exact strict component={()=>{return <EditProfile />}}/>
       <Route path="/friends" exact strict component={()=>{return <Friends/>}}/>
       <Route path="/imagegallery" exact strict component={()=>{return <ImageGallery />}}/>
       <Route path="/adminpage" exact strict component={()=>{return <Admin />}}/>
       <Route path="/createEvent" exact strict component={()=>{return <CreateEvent />}}/>
       <Route path="/event" exact strict component={()=>{return <Event />}}/>
       <Route path="/admin" exact strict component={()=>{return <Adminlogin />}}/>
       <Route path="/addJobs" exact strict component={()=>{return <AddJob />}}/>
       <Route path="/jobs" exact strict component={()=>{return <Jobs />}}/>
       <Route path="/groups" exact strict component={()=>{return <Groups />}}/>
       <Route path="/survey" exact strict component={()=>{return <Survey />}}/>
       <Route path="/adminsurvey" exact strict component={()=>{return <AdminSurvey />}}/>
       <Route path="/adminrequest" exact strict component={()=>{return <AdminRequest />}}/>
       <Route path="/addAlumni" exact strict component={()=>{return <AddAlumni />}}/>
       <Route path="/searchJob" exact strict component={()=>{return <SearchJobAndEvents />}}/>
       <Route path="/openGroup/:group_Id/:group_Name/:cnic" exact strict component={()=>{
          const {group_Name} = useParams();
          const {group_Id} = useParams();
          const {cnic} =useParams();
         
         return <OpenGroup group_Name={group_Name} id={group_Id} cnic={cnic} />}}/>
          <Route path="/notifications" exact strict component={()=>{return <Notification />}}/>
          <Route path="/surveyreport" exact strict component={()=>{return <SurveyReport />}}/>
          <Route path="/adminsurveyreport" exact strict component={()=>{return <AdminSurveyReport />}}/>
          <Route path="/rollback" exact strict component={()=>{return <Rollback />}}/>
          </Router>
    )
  }
}



export default App;
