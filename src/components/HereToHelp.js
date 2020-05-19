import React from 'react';

const HereToHelp = props => {
    return (
        <div className="HereToHelp">
            <h3><span className="text-success">ClassRhino</span> is here to help</h3>
            <br/>
            <div className="boxes">
                <div className="row">
                    <div className="col-sm">
                        <div className="box">
                            <img alt="lamp-icon" src="https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Light-512.png" width="70"/>
                            <br/>
                            <br/>
                            <p>Get help with your homework on a weekly basis</p>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="box">
                            <img alt="bulb-icon" src="https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Idea-512.png" width="70"/>
                            <br/>
                            <br/>
                            <p>Or prepare to ace your upcoming exams!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HereToHelp;