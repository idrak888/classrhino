import React from 'react';
import rhino from '../assets/rhino.png';

const WhyWait = () => {
    return (
        <div className="WhyWait">
            <img alt="dummy-alt" src={rhino} />
            <br/>
            <br/>
            <h2>So why wait?</h2>
            <p>Sign up and claim your <strong>free session</strong> now!</p>
            <a href="/student/register"><button className="btn btn-success">Join as a student</button></a>
            <a href="/teacher/register"><button className="btn btn-success">Join as a teacher</button></a>
            <br/>
            <p><a href="/learnmore">learn more</a></p>
        </div>
    )
}

export default WhyWait;