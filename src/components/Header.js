import React from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';
import $ from 'jquery';
import * as firebase from 'firebase';
import signoutIcon from '../assets/signout.png';

class Header extends React.Component {
    componentDidMount() {
        $('.links-responsive').hide();
    }
    toggle = e => {
        document.getElementById('nav-icon3').classList.toggle('open');
        $('.links-responsive').toggle('fast');
    }
    logout = () => {
        firebase.auth().signOut().then(function() {
            window.location = '/';
        }, function(error) {
            console.log(error);
        });
    }
    render () {
        return (
            <div className="Header">
                <a href="/"><img alt="dummy-alt" src={logo} className="brand"/></a>
                <div className="links-responsive">
                    <ul>
                        { this.props.user.subjects ?
                            <li><a href={`/dashboard/teacher/${this.props.user._id}`}>Dashboard</a></li>
                            :
                            <li><a href={`/dashboard/student/${this.props.user._id}`}>Dashboard</a></li>
                        }
                        <li><a href="/browse/all">Browse tutors</a></li>
                        <li><a href="/learnmore">Learn more</a></li>
                        { this.props.user === '' ? 
                            <div className="actions">
                                <li><a href="/signin">Sign in</a></li>
                                <li>
                                    <a href="/student/register"><button className="btn btn-success">Get started</button></a>
                                </li>
                            </div> 
                            : 
                            <div className="actions">
                                <li><strong>{this.props.user.email}</strong></li>
                            </div>
                        }
                        <div className="bottom">
                            <hr/>
                            <a href="/"><img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/social-media-2146/512/1_social-512.png" width="50"/></a>
                            <a href="/"><img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/social-media-2146/512/25_social-512.png" width="50"/></a>
                        </div>
                    </ul>
                </div>
                { this.props.user !== '' ?
                    <button onClick={this.logout} className="btn btn-secondary">
                        Sign out <img alt="dummy-alt" src={signoutIcon}/>
                    </button>
                    :
                    <a href="/signin"><button className="btn btn-dark">Sign in</button></a>
                }
                <div className="links">
                    <ul>
                        { this.props.user.subjects ?
                            <li><a href={`/dashboard/teacher/${this.props.user._id}`}>Dashboard</a></li>
                            :
                            <li><a href={`/dashboard/student/${this.props.user._id}`}>Dashboard</a></li>
                        }
                        <li><a href="/browse/all">Browse tutors</a></li>
                        <li><a href="/learnmore">Learn more</a></li>
                        { this.props.user === '' ? 
                            <div className="actions">
                                <li><a href="/signin">Sign in</a></li>
                                <li>
                                    <a href="/student/register"><button className="btn btn-success">Get started</button></a>
                                </li>
                            </div> 
                            : 
                            <div className="actions">
                                <li><strong>{this.props.user.email}</strong></li>
                                <li>
                                    <button onClick={this.logout} className="btn btn-secondary">Sign out <img alt="dummy-alt" src={signoutIcon}/></button>
                                </li>
                            </div>
                        }
                    </ul>
                </div>
                <div onClick={this.toggle} className="toggler">
                    <div id="nav-icon3">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Header;