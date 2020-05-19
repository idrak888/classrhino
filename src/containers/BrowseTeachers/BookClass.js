import React, { Component } from 'react';
import addDays from './addDays';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import axios from 'axios';

class BookClass extends Component {
    state = {
        teacher: {},
        studentInfo: {},
        workingDays: [],
        dayNums: [],
        startDate: new Date(),
        selectedDate: '',
        sessions: [],
        subjects: [],
        grades: [],
        timezone: '',
        classDetails: {status: '', hours: '', date: '', subject: '', level: '', totalCharge: ''}
    }
    componentDidMount() {
        const container = document.querySelector('.mainContainer');
        const timePicker = document.querySelector('.timePicker');
        const loader = document.querySelector('.loader');
        var studentInfo = localStorage.getItem('userDoc');
        studentInfo = JSON.parse(studentInfo);

        timePicker.style.display = 'none';
        container.style.display = 'none';
        loader.style.display = 'block';

        const workingDays = this.props.teacher.workingDays;
        var dayNums = [];

        for (let i=0;i<workingDays.length;i++) {
            switch (workingDays[i].day) {
                case 'Sunday':
                    dayNums.push(0);
                    break;
                case 'Monday':
                    dayNums.push(1);
                    break;
                case 'Tuesday':
                    dayNums.push(2);
                    break;
                case 'Wednesday':
                    dayNums.push(3);
                    break;
                case 'Thursday':
                    dayNums.push(4);
                    break;
                case 'Friday':
                    dayNums.push(5);
                    break;
                case 'Saturday':
                    dayNums.push(6);
                    break;
                default: 
                    console.log('Day not found');
                    break;
            }
        }
        
        axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${this.props.teacher.location.city.wikiDataId}`, {
                params: {
                    cityid: this.props.teacher.location.city.wikiDataId
                },
                headers: {
                    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                    "x-rapidapi-key": "b6fa25f36amsh243a7350b3e7967p14a420jsne313f3a87f80"
                }
        }).then(doc => {
            this.setState({
                dayNums,
                workingDays,
                teacher: this.props.teacher,
                studentInfo,
                subjects: this.props.teacher.subjects,
                grades: this.props.teacher.grades,
                timezone: doc.data.data.timezone.replace('__', '/')
            });
            setTimeout(() => {
                container.style.display = 'block';
                loader.style.display = 'none';
            }, 1000);
        }).catch(e => {
            console.log(e);
        });
    }
    isWeekday = date => {
        const day = date.getDay();
        return this.state.dayNums.indexOf(day) !== -1;
    }
    handleChange = date => {
        this.setState({
            startDate: date,
            selectedDate: date
        });
    }
    convertTo24 = time => {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if(AMPM === "PM" && hours<12) hours = hours+12;
        if(AMPM === "AM" && hours===12) hours = hours-12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if(hours<10) sHours = "0" + sHours;
        if(minutes<10) sMinutes = "0" + sMinutes;
        return [sHours, sMinutes];
    }
    convertTo12 = (hours, minutes) => {
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var finalTime = hours + ":" + minutes + " " + AmOrPm; 
        return finalTime;
    }
    loadSessions = e => {
        const err = document.querySelectorAll('.err');
        const timePicker = document.querySelector('.timePicker');
        const workingDays = this.state.workingDays;
        
        if (this.state.classDetails.subject === '' || this.state.classDetails.level === '') {
            err[0].innerHTML = 'Please choose a subject and your grade/level to proceed.';
            setTimeout(() => {
                err[0].innerHTML = '';
            }, 3000);
        } else { 
            err[0].innerHTML = '';
            this.selectHandler(e, {date:this.state.selectedDate.toString().slice(0, 15)});

            document.querySelector('.proceed').style.display = 'none';
            timePicker.style.display = 'block';

            var dayCode = this.state.selectedDate.toString().slice(0, 3);
            var sessions = [];

            for (let i=0;i<workingDays.length;i++) {
                if (workingDays[i].day.slice(0, 3) === dayCode) {
                    sessions = workingDays[i].sessions;
                }
            }
            this.setState({sessions});
        }
    }
    selectHandler = (e, obj) => {
        var classDetails = this.state.classDetails;

        if (obj.session) {
            classDetails.hours = obj.session;
        } else if (obj.subject) {
            classDetails.subject = obj.subject;
        } else if (obj.date) {
            classDetails.date = obj.date;
        } else if (obj.grade) {
            classDetails.level = obj.grade;
        }
        
        var result = [],
        node = e.currentTarget.parentNode.firstChild;
    
        while ( node ) {
            if ( node !== this && node.nodeType === Node.ELEMENT_NODE && node.classList[0] === e.currentTarget.classList[0] ) 
            result.push( node );
            node = node.nextElementSibling || node.nextSibling;
        }

        for (let node of result) {
            node.classList.remove('selected');
        }
        e.currentTarget.classList.add('selected');
        
        this.setState({classDetails});
    }
    localTime = session => {
        var selectedDate = this.state.selectedDate.toString().split(' ');
        
        var localDT = DateTime.fromObject({
            year: selectedDate[3],
            day: selectedDate[2],
            hour: this.convertTo24(session.slice(0, 7))[0],
            minute: this.convertTo24(session.slice(0, 7))[1],
            zone: this.state.timezone
        }).toLocal();
        var dtHour = localDT.hour.toString();
        var dtMinute = localDT.minute.toString();

        if (dtHour.length < 2) {
            dtHour = `0${dtHour}`;
        }

        var dtHour2 = localDT.plus({ hours: 2 }).hour;
        if (dtHour2.length < 2) {
            dtHour2 = `0${dtHour2}`;
        }
        if (dtMinute.length < 2) {
            dtMinute = `0${dtMinute}`;
        }
        return (
            <strong>
                {/* {localDT.toLocaleString(DateTime.DATETIME_MED).slice(0, 12)} */}
                {`${selectedDate[2]} ${selectedDate[1]} ${selectedDate[3]},`}
                <br/> 
                {this.convertTo12(dtHour, dtMinute)} to {this.convertTo12(dtHour2, dtMinute)}
            </strong>
        )
    }
    toPayment = () => {
        var classDetails = this.state.classDetails;
        const teacherId = this.state.teacher._id;
        const totalCharge = parseInt(this.state.teacher.rate) * 2;

        classDetails.totalCharge = totalCharge;
        console.log(classDetails);
        localStorage.setItem('classDetails', JSON.stringify(classDetails));
        window.location = `/payment/${teacherId}`;
    }
    render() { 
        return (
            <div className="BookClass modal">
                <span className="title">Choose date & time <p onClick={this.props.closeModule}>cancel</p></span>
                <img alt="dummy-alt" className="loader" src="https://www.drupal.org/files/issues/throbber_12.gif"/>        
                <div className="mainContainer container">
                    <div className="row">
                        <div className="col-sm-4">
                            <img alt="dummy-alt" src={this.state.teacher.profilePic} className="profile-pic"/> <strong className="name">{this.state.teacher.name}</strong>
                            <br/>
                            <br/>
                            <strong>Teacher's working days:</strong>
                            {this.state.workingDays.map(workingDay => {
                                return (
                                    <span>
                                        <br/>
                                        {workingDay.day}
                                    </span>
                                )
                            })}
                            <hr/>
                        </div>
                        <div className="col-sm-8">
                            <h4>Choose a subject you need help with</h4>
                            {this.state.subjects.map(subject => {
                                return <span onClick={(e) => this.selectHandler(e, {subject})} className="subject">{subject}</span>
                            })}
                            <br/>
                            <br/>
                            <h4>Select your level of study</h4>
                            {this.state.grades.map(grade => {
                                return <span onClick={(e) => this.selectHandler(e, {grade})} className="grade">{(grade === 'O level' || grade === 'A level') ? grade : `Grades ${grade}`}</span>
                            })}
                            <br/>
                            <br/>
                            <h4>Choose an upcoming date for your class</h4>
                            <span className="text-secondary">You must book a class at least 3 days in advanced.</span>
                            <br/>
                            <br/>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                filterDate={this.isWeekday}
                                minDate={new Date().addDays(3)}
                                onFocus={(e) => {
                                        e.target.readOnly = true;
                                        e.target.blur();
                                    }
                                }
                            />
                            <br/>
                            { 
                                this.state.selectedDate !== '' ? 
                                    <div>
                                        <h2 className="displayDate">{this.state.selectedDate.toString().slice(0, 15)}</h2> 
                                        <button onClick={this.loadSessions} className="btn btn-success proceed">Proceed?</button>
                                        <br/>
                                        <span className="text-danger err"></span>
                                    </div>
                                    : 
                                    ''
                            }
                            <div className="timePicker" id="timePicker">
                                <h4>Choose a time for your class (2 hours per class)</h4>
                                <span className="text-secondary">Some sessions may already be booked.</span>
                                <br/>
                                <br/>
                                {this.state.sessions.map(session => {
                                    return (
                                        <span onClick={(e) => this.selectHandler(e, {session})} className="session">
                                            Local time: <br/>
                                            {this.localTime(session)}
                                        </span>
                                    )
                                })}
                                <br/>
                                <br/>
                                {
                                    this.state.classDetails.hours !== '' ?
                                        <div>
                                            <button onClick={this.toPayment} className="btn btn-success continue">Continue to payment</button>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookClass;