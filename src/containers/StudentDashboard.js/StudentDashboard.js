import React from 'react';
import './Main.css';
import axios from 'axios';
import illustration5 from '../../assets/illustration5.png';

class StudentDashboard extends React.Component {
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
            }).catch(e => {
                console.log(e);
            });
        } else {
            this.setState({user: ''});
        }
    }
    dashboardContainer = state => {
        if (state.user) {
            var notifications = state.notifications.map(n => {
                return (
                    <div>
                        <a href="/"><span className="text-secondary">{n.date}</span>: {n.data}</a>
                    </div>
                )
            });
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
                            <h3>Profile</h3>
                            <hr/>
                            <div className="profile-details">
                                <img alt="dummy-alt" width="100" src="https://themevedanta.com/wp-content/uploads/2018/10/avatar.png"/>
                                <br/>
                                <br/>
                                <h2>{this.state.user.name} <img alt="dummy-alt" width="30" src={this.state.countryFlag}/></h2>
                                <p>{this.state.user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="panel">
                            <div className="row">
                                <div className="col-xs">
                                    <h3>Your classes</h3>
                                </div>
                                <div className="col-xs">
                                    <a href="/browse/all"><button className="btn btn-primary">Book a class</button></a>
                                </div>
                            </div>
                            <hr/>
                            <div className="classes">
                                <div className="noClasses">
                                    <img alt="dummy-alt" className="illustration" src={illustration5}/>
                                    <h3>You haven't booked any classes yet</h3>
                                    <p><a href="/browse/all">Browse teachers</a> and book a class!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="StudentDashboard">
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

export default StudentDashboard;