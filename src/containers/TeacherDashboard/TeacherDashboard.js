import React from 'react';
import './Main.css';
import axios from 'axios';
import ScheduleDisplay from '../../components/ScheduleDisplay/ScheduleDisplay';

class TeacherDashboard extends React.Component {
    state = {
        user: {},
        countryFlag: '',
        notifications: [
            {data: 'You have been listed on ClassRhino and your profile is now live!', date: 'Today'},
            {data: 'Your account has been approved', date: 'Today'}
        ]
    }
    componentDidMount() {
        var user = localStorage.getItem('userDoc');
        if (user.length > 1) {
            user = JSON.parse(user);
            axios.get(`https://restcountries.eu/rest/v2/name/${user.location.country}?fullText=true`)
            .then(doc => {
                this.setState({user, countryFlag:doc.data[0].flag});

                console.log(this.state.user);
            }).catch(e => {
                console.log(e);
            });
        } else {
            this.setState({user: ''});
        }
        
    }
    dashboardContainer = state => {
        var workingDays = [];
        if (state.user.grades) {
            var grades = state.user.grades.map(grade => {
                return <span className="subject">{grade}</span>
            });
            var subjects = state.user.subjects.map(s => {
                return <span className="subject">{s}</span>
            });
            var notifications = state.notifications.map(n => {
                return (
                    <div>
                        <a href="/"><span className="text-secondary">{n.date}</span>: {n.data}</a>
                    </div>
                )
            });
            workingDays = state.user.workingDays;
        }
        return (
            <div className="DashboardContainer">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel">
                            <h4>Notifications <span className="notification-count">{this.state.notifications.length}</span></h4>
                            <hr/>
                            <div className="notifications">
                                {notifications}
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel">
                            <h4>Profile</h4>
                            <hr/>
                            <div className="profile-details">
                                <img alt="dummy-alt" className="profile-pic" src={state.user.profilePic}/>
                                <br/>
                                <br/>
                                <h2>{state.user.name} <img alt="dummy-alt" width="30" src={state.countryFlag}/></h2>
                                <p>{state.user.email}</p>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="info">
                                <h4>Grades</h4>
                                {grades}
                                <br/>
                                <hr/>
                                <h4>Subjects</h4>
                                {subjects}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="panel">
                            <h4>Your classes</h4>
                            <hr/>
                            <div className="classes">
                                <div className="noClasses">
                                    <h3>You don't have any upcoming classes</h3>
                                    <p>Makes sure to regularly check your dahboard and your email for any new classes!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel">
                            <div className="row">
                                <div className="col-xs">
                                    <h3>Your current schedule</h3>
                                </div>
                                <div className="col-xs">
                                    <a href="/"><button className="btn btn-primary">Edit <img alt="dummy-alt" src="https://www.materialui.co/materialIcons/image/edit_white_192x192.png" width="20"/></button></a>
                                </div>
                            </div>
                            <hr/>
                            <ScheduleDisplay days={workingDays}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="TeacherDashboard">
                {
                    this.state.user === '' ?
                    <div className="NotSignedIn">
                        <h1>Not signed in</h1>
                        <a href="/signin">Sign in</a>
                    </div>
                    :
                    this.dashboardContainer(this.state)
                }
            </div>
        )
    }
}

export default TeacherDashboard;