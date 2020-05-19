import React from 'react';
import screensharing from '../assets/screensharing.png';
import iconset from '../assets/iconset.png';

const Skype = props => {
    return (
        <div className="ScreenSharing">
            <br/>
            <br/>
            <div className="row">
                <div className="col-sm">
                    <h1>Skype screen sharing</h1>
                    <p>Use skype's screen sharing feature in combination with hundreds of online resources and PDFs to enjoy effective classes.</p>
                    <img alt="dummy-alt" className="iconset" src={iconset}/>
                </div>
                <div className="col-sm">
                    <img alt="dummy-alt" className="screenshot" src={screensharing}/>
                </div>
            </div>
        </div>
    )
}

export default Skype;