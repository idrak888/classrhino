import React, { Component } from 'react';
import './Main.css';

class Payment extends Component {
    state = {
        teacherId: '',
        studentId: '',
        classDetails: {}
    }
    componentDidMount() {
        var {teacherId} = this.props.match.params;
        var studentId = JSON.parse(localStorage.getItem('userDoc'))._id;
        var classDetails = JSON.parse(localStorage.getItem('classDetails'));

        this.setState({teacherId, studentId, classDetails});
    }
    render() {
        return (
            <div className="Payment">
                <div className="container">
                    <h1>Payment</h1>
                    <hr/>
                    <br/>
                    <h2>Teacher ID</h2>
                    {this.state.teacherId}
                    <h2>Student ID</h2>
                    {this.state.studentId}
                    <h2>Class details</h2>
                    <h4>{this.state.classDetails.level}</h4>
                    <h4>{this.state.classDetails.subject}</h4>
                    <h4>{this.state.classDetails.date}</h4>
                    <h4>{this.state.classDetails.hours}</h4>
                </div>
            </div>
        );
    }
}

export default Payment;