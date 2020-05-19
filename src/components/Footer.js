import React from 'react';
import playstore from '../assets/playstore.png';
import appstore from '../assets/appstore.png';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="row">
                <div className="col-sm">
                    <a href="/">Home</a>
                    <br/>
                    <br/>
                    <a href="/learnmore">Learn more</a>
                    <br/>
                    <br/>
                    <a href="/browse/all">Browse teachers</a>
                    <br/>
                    <br/>
                    <a href="/signin">Sign in</a>
                    <br/>
                    <br/>
                    <a href="/student/register"><button className="btn btn-success">Sign up</button></a>
                </div>
                <div className="col-sm">
                    <a href="/"><img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/social-media-2146/512/1_social-512.png" width="65"/></a>
                    
                    <a href="/"><img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/social-media-2146/512/25_social-512.png" width="65"/></a>
                </div>
                <div className="col-sm">
                    <img alt="dummy-alt" className="app-link" src={appstore} width="200"/>  
                    
                    <img alt="dummy-alt" className="app-link" src={playstore} width="200"/>
                    <p>Apps still under development.</p>
                </div>
            </div>
            <br/>
            <p>classrhino.com</p>
        </div>
    )
}

export default Footer;