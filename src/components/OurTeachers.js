import React from 'react';
import Slice from '../assets/Slice.png';
import languages from '../assets/languages.png';
import tutorsample from '../assets/tutorsample.png';
import skeleton from '../assets/skeleton.png';

const OurTeachers = () => {
    return (
        <div className="OurTeachers">
            <h1>Our teachers</h1>
            <div className="row info">
                <div className="col-sm">
                    <img alt="dummy-alt" className="img-fluid" src={Slice}/>
                </div>
                <div className="col-sm">
                    <p>
                        At classRhino we only accept teachers that are <strong>qualfied</strong>,
                        has a strong <strong>educational background</strong> and has proven records
                        of <strong>experience</strong> in their subjects and curriculums.
                        <br/>
                        <br/>
                        Before manually checking and accepting teachers, we require their minimum level <strong>certificates</strong> (A level or equivalent) and their current academic levels.
                    </p>
                </div>  
            </div>
            <div className="row">
                <div className="col-xs">
                    <span className="medium">Find tutors from</span>
                    <span className="large">all over the world</span>
                    <span className="small">Any language, any country.</span>
                </div>
                <div className="col-xs">
                    <img alt="dummy-alt" src={languages} className="img-fluid"/>
                </div>
            </div>
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <img alt="dummy-alt" src={tutorsample} className="sample"/>
            <br/>
            <img alt="dummy-alt" src={skeleton} className="sample skeleton1"/>
            <br/>
            <img alt="dummy-alt" src={skeleton} className="sample skeleton2"/>
            <a href="/browse/all"><button className="btn btn-primary">Browse tutors!</button></a>
        </div>
    )
}

export default OurTeachers;