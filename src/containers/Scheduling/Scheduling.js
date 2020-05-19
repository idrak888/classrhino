import React from 'react';
import './Main.css';
import TimeSelector from './TimeSelector';
import axios from 'axios';

class Scheduling extends React.Component {
    state = {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        selected: [],
        selectedTimes: [],
        user: {}
    }
    componentDidMount() {
        this.boxes = document.querySelectorAll('.col-sm');
        var user = JSON.parse(localStorage.getItem('userDoc'));

        this.setState({user});
    }
    select = (day, index) => {
        const dayDivs = document.querySelectorAll('.day');
        var selected = this.state.selected
        var selectedIndex = selected.indexOf(day);

        if (selectedIndex === -1) {
            selected.push(day);
            dayDivs[index].classList.add('selected');
        } else {
            selected.splice(selectedIndex, 1);
            dayDivs[index].classList.remove('selected');
        }

        this.setState({selected});
    }
    handleHover = e => {
        var thisIndex = (e.target.classList[1]) - 1; 

        if (thisIndex < 44) {
            for (let i=thisIndex;i<(thisIndex+5);i++) {
                var thisBox = this.boxes[i];
                if (!thisBox.classList.contains('selectedTime')) {
                    thisBox.style.backgroundColor = '#2E8F0E';
                    thisBox.style.color = 'white';
                    thisBox.style.border = '1px solid #2E8F0E';
                }
            }
        }
    }
    unHover = e => {
        var thisIndex = (e.target.classList[1]) - 1;

        if (thisIndex < 44) {
            for (let i=thisIndex;i<(thisIndex+5);i++) {
                var thisBox = this.boxes[i];
                if (!thisBox.classList.contains('selectedTime')) {
                    thisBox.style.backgroundColor = 'white';
                    thisBox.style.color = 'black';
                    thisBox.style.border = '1px solid lightgrey';
                }
            }
        }
    }
    handleClick = e => {
        var thisIndex = (e.target.classList[1]) - 1; 
        var selectedTimes = this.state.selectedTimes;
        var session = {time: '', divIndex: 0};
        var overlap = false;

        if (thisIndex < 44) {
            for (let i=thisIndex;i<(thisIndex+5);i++) {
                var thisBox = this.boxes[i];
                if (thisBox.classList.contains('selectedTime')) {
                    overlap = true;
                    break;
                } else {
                    if (i === thisIndex) {
                        session.time = `${thisBox.innerHTML}`;
                        session.divIndex = i;
                    } else if (i === thisIndex+4) {
                        session.time = `${session.time} to ${thisBox.innerHTML}`;
                    }
                    thisBox.style.backgroundColor = '#25780A';
                    thisBox.style.color = 'white';
                    thisBox.style.border = '1px solid #25780A';

                    thisBox.classList.add('selectedTime');
                }
            }
        }
        if (!overlap) {
            session.time = session.time.replace(/<br>/g, ' ');
            selectedTimes.push(session);

            console.log(session);
        }
        this.setState({selectedTimes});
    }
    removeSession = (index, divIndex) => {
        var selectedTimes = this.state.selectedTimes;

        for (let i=divIndex;i<(divIndex+5);i++) {
            var thisBox = this.boxes[i];
            thisBox.style.backgroundColor = 'white';
            thisBox.style.color = 'black';
            thisBox.style.border = '1px solid lightgrey';
            
            thisBox.classList.remove('selectedTime');
        }
        selectedTimes.splice(index, 1);
        this.setState({selectedTimes});
    }
    confirm = e => {
        const err = document.querySelector('.err');
        const btn = e.target;

        btn.disabled = true;

        if (this.state.selected.length < 1) {
            err.innerHTML = 'Please select at least 1 day.';
            btn.disabled = false;
        } else {
            if (this.state.selectedTimes.length < 1) {
                err.innerHTML = 'Please select at least 1 session from above.';
                btn.disabled = false;
            } else {
                btn.innerHTML = 'finishing up...';
                err.innerHTML = '';

                var workingDays = [];
                var selectedTimes = [];

                for (let obj of this.state.selectedTimes) {
                    selectedTimes.push(obj.time);
                }

                for (let day of this.state.selected) {
                    var obj = {day, sessions: selectedTimes};
                    workingDays.push(obj);
                }

                axios.post(`https://classrhino-users.herokuapp.com/teachers/update/${this.state.user._id}`, {
                    workingDays
                }).then(doc => {
                    btn.innerHTML = 'Confirm';
                    btn.disabled = false;

                    axios.get(`https://classrhino-users.herokuapp.com/teachers/${doc.data._id}`)
                    .then(doc => {
                        localStorage.setItem('userDoc', JSON.stringify(doc.data[0]));
                        window.location = `/dashboard/teacher/${doc.data._id}`;
                    });
                }).catch(e => {
                    btn.innerHTML = 'Confirm';
                    btn.disabled = false;
                    err.innerHTML = e;
                })
            }
        }
    }
    render () {
        return (
            <div className="Scheduling">
                <h2>Scheduling</h2>
                <p className="text-secondary">Note that these are just the initial settings and you may choose to edit them later.</p>
                <br/>
                <div className="message">
                    <h1>Inadequate screen size</h1>
                    <p>We prefer a desktop screen for this part.</p>
                    <p>You can sign in to your account on a desktop and continue.</p>
                </div>
                <div className="main-container">
                    <h3>Select the days you want to work below:</h3>
                    <p>All days and times are displayed in your local time.</p>
                    <br/>
                    <h4><span className="text-primary">{this.state.selected.length}</span> selected</h4>
                    {this.state.days.map((day, index) => {
                        return (
                            <div className="day" key={index} onClick={() => this.select(day, index)}>
                                <h4>{day}</h4>
                            </div>
                        )
                    })}
                    <br/>
                    <br/>
                    <h3>Select timings (2 hours each session):</h3>
                    <p>These timings will be applied to each day you have selected. They can be changed later on.</p>
                    <TimeSelector handleHover={this.handleHover} unHover={this.unHover} handleClick={this.handleClick}/>
                    <br/>
                    <h4><span className="text-primary">{this.state.selectedTimes.length}</span> session(s) selected</h4>
                    <h5><span className="text-primary">{this.state.selectedTimes.length * 2}</span> hours</h5>
                    <br/>
                    {this.state.selectedTimes.map((session, index) => {
                        return <span key={index} className="session">{session.time} <img alt="dummy-alt" onClick={() => this.removeSession(index, session.divIndex)} src="https://cdn0.iconfinder.com/data/icons/command-buttons/512/Cross-512.png" width="20"/></span>
                    })} 
                    <br/>
                    <br/>
                    <h3>Confirmation</h3>
                    <h5>You've agreed to work on these days: </h5>
                    {this.state.selected.map(day => {
                        return <p className="text-success"> {day}</p>
                    })}
                    <br/>
                    <h5>On these times (your local time): </h5>
                    {this.state.selectedTimes.map(session => {
                        return <p className="text-success"> {session.time}</p>
                    })}
                    <br/>
                    <button onClick={this.confirm} className="btn btn-primary">Confirm</button>
                    <p className="text-danger err"></p>
                </div>
            </div>
        )
    }
}

export default Scheduling;