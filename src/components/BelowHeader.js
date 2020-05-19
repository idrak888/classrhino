import React from 'react';
import illustration from '../assets/illustration1.png';

const BelowHeader = props => {
    return (
        <div className="BelowHeader">
            <div className="row">
                <div className="col-sm-6">
                    <div className="info">
                        <h1>One-on-one classes made better.</h1>
                        <p>Find online tutors, any curriculum, <br/> any subject and get help with your studies.</p>
                        <br/>
                        <h3>Sign up as a...</h3>
                        <br/>
                        <a href="/student/register"><button className="btn btn-success">Student</button></a> <a href="/teacher/register"><button className="btn btn-success">Teacher</button></a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <img alt="Illustration" src={illustration} className="illustration"/>
                </div>
            </div>
        </div>
    )
}

export default BelowHeader;