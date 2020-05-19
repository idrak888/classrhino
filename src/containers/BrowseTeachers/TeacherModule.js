import React from 'react';

const TeacherModule = props => {
    return (    
        <div className="TeacherModule">
            
            <div className="row">
                <div className="col-xs-1">
                    <img alt="dummy-alt" className="profile-pic" src={props.profilePic}/>
                    <br/>
                    <span className="name">{props.name}</span>
                    <br/>
                    <img alt="dummy-alt" src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-07-512.png" width="30"/> <span>{props.city}, {props.country}</span>
                </div>
                <div className="col-xs-9">
                    <div className="info">
                        <span>Languages: <br/>{props.languages.map((lang, index) => <strong> {lang} </strong>)}</span>
                        <br/>
                        <span>Subjects: <br/>{props.subjects.map((sub, index) => <strong> {sub} </strong>)}</span>
                        <br/>
                        <span>Grades/Levels: <br/>{props.grades.map((grade, index) => <strong> {grade} </strong>)}</span>
                        <br/>
                    </div>
                </div>
                <div className="col-xs-2">
                    <h3>${props.rate}/hr</h3>
                    <button onClick={props.bookClass} className="btn btn-success">Book a class</button>
                </div>  
            </div>
        </div>
    );
};

export default TeacherModule;