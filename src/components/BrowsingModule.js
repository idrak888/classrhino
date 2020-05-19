import React from 'react';
import Fade from 'react-reveal/Fade';

class BrowsingModule extends React.Component {
    state = {
        teachers: [],
        keywords: '',
        searchResults: []
    }
    applyFilters = e => {
        const grade = document.querySelector('.grade').value;
        const subject = document.querySelector('.subject').value;

        window.location = `/browse/${grade}&=${subject}`;
    }
    render () {
        return (
            <div className="BrowsingModule">
                <Fade>
                    <div className="container">
                        <div className="title">
                            <h4>Find tutors and book a session!</h4>
                            <span>*First session is free of charge!</span>
                        </div>
                        <br/>
                        <div className="inner-container">
                            <select className="grade">
                                <option value="">Your grade or level</option>
                                <option value="A level">A level</option>
                                <option value="O level">O level</option>
                                <option value="10-12">10-12</option>
                                <option value="8-10">8-10</option>
                                <option value="6-8">6-8</option>
                            </select>
                            <br/>
                            <select className="subject">
                                <option value="">Subject</option>
                                <option value="maths">Maths</option>
                                <option value="english">English</option>
                                <option value="economics">Economics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                                <option value="geography">Geography</option>
                            </select>
                            <br/>
                            <button onClick={this.applyFilters} className="btn btn-primary">Go!</button>
                    
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
};

export default BrowsingModule;