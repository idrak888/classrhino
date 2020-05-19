import React from 'react';

const FilterOptions = props => {
    const applyFilters = () => {
        const country = document.querySelector('.country').value;
        const language = document.querySelector('.language').value.toUpperCase();
        const gender = document.querySelector('.gender').value;
        const grade = document.querySelector('.grades').value;
        const subject = document.querySelector('.subject').value;

        props.applyFilters(country, language, gender, grade, subject);
    }
    return (
        <div className="FilterOptions modal">
            <span className="title">Filter options <p onClick={props.toggleFilterOptions}>cancel</p></span> 
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h5>Country</h5>
                        <select className="country">
                            <option value="">Select country</option>
                            {props.countries.map(country => {
                                return <option value={country.name}>{country.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm">
                        <h5>Language</h5>
                        <input className="language" type="text" placeholder="Enter language"/>
                    </div>
                    <div className="col-sm">
                        <h5>Gender</h5>
                        <select className="gender">
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <h5>grades/level</h5>
                        <select className="grades">
                            <option value="">Select grades/level</option>
                            <option value="A level">A level</option>
                            <option value="O level">O level</option>
                            <option value="10-12">10-12</option>
                            <option value="8-10">8-10</option>
                            <option value="6-8">6-8</option>
                        </select>
                    </div>
                    <div className="col-sm">
                        <h5>Subject</h5>
                        <select className="subject">
                            <option value="">Select subject</option>
                            <option value="maths">Maths</option>
                            <option value="english">English</option>
                            <option value="economics">Economics</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>
                </div>
                <br/>
                <button onClick={applyFilters} className="btn btn-secondary">Apply filters</button>
                <br/>
                <br/>
            </div>
        </div>
    );
};

export default FilterOptions;