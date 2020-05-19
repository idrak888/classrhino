import React from 'react';
import './styles/Home.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './containers/Home';
import StudentSignup from './containers/StudentSignup';
import TeacherSignup from './containers/TeacherSignup';
import Signin from './containers/Signin';
import StudentDashboard from './containers/StudentDashboard.js/StudentDashboard';
import TeacherDashboard from './containers/TeacherDashboard/TeacherDashboard';
import LearnMore from './containers/LearnMore/LearnMore';
import Scheduling from './containers/Scheduling/Scheduling';
import BrowseTeachers from './containers/BrowseTeachers/BrowseTeachers';
import Payment from './containers/Payment/Payment';

import { BrowserRouter, Route } from 'react-router-dom';
import $ from 'jquery';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAiiSvhVXFBjiS-AAdN67-qMwSpsW9VQMc",
  authDomain: "classrhino-979de.firebaseapp.com",
  databaseURL: "https://classrhino-979de.firebaseio.com",
  projectId: "classrhino-979de",
  storageBucket: "classrhino-979de.appspot.com",
  messagingSenderId: "729169602880",
  appId: "1:729169602880:web:699d0b3271c7ec023772a5",
  measurementId: "G-G0GVXHXRQG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    // ...
    localStorage.setItem('user', JSON.stringify({email, uid}));
  } else {
    console.log('User not signed in');
    localStorage.setItem('user', '');
    localStorage.setItem('userDoc', '');
  }
});

class App extends React.Component {
  state = {
    user: {}
  }
  componentDidMount () {
    $(document).ready(function() {
      $('.App').hide();
      $('.App').fadeIn(500);
    });
    var user = localStorage.getItem('userDoc');
    
    if (user) {
      if (user.length > 1) {
        user = JSON.parse(user);
        this.setState({user});
      } else {
        this.setState({user: ''});
      }
    } else {
      this.setState({user: ''});
    }
  }
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/learnmore" component={LearnMore}/>
          <Route exact path="/student/register" component={StudentSignup}/>
          <Route exact path="/teacher/register" component={TeacherSignup}/>
          <Route path="/scheduling/teacher" component={Scheduling}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/dashboard/student/" component={StudentDashboard}/>
          <Route path="/dashboard/teacher/" component={TeacherDashboard}/>
          <Route path="/browse/:filters" component={BrowseTeachers}/>
          <Route path="/payment/:teacherId" component={Payment}/>
          <Footer/>
        </div>  
      </BrowserRouter>
    )
  }
}

export default App;