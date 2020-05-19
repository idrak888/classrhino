import React, { Component } from 'react';
import './Main.css';

class ScheduleDisplay extends Component {
    render() {
        return (
            <div className="ScheduleDisplay">
                {this.props.days.map(day => {
                    return (
                        <div className="Day">
                            <h4>{day.day}</h4>
                            {day.sessions.map(session => {
                                return <span className="session">{session}</span>
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ScheduleDisplay;