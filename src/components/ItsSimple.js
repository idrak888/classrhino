import React from 'react';

const ItsSimple = props => {
    return (
        <div className="ItsSimple">
            <h1>It's simple.</h1>
            <br/>
            <br/>
            <div className="row">
                <div className="col-sm">
                    <img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/man_male_avatar_portrait-512.png"/>
                </div>
                <div className="col-sm">
                    <h3>Create an account</h3>
                    <p>Give us a brief introduction of you, your curriculum and your location.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <img alt="dummy-alt" src="https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Search-512.png"/>
                </div>
                <div className="col-sm">
                    <h3>Search for an online tutor</h3>
                    <p>Find the right tutor based on your choice of curriculum, subject, time zone and rate.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/41-skype_chat-512.png"/>
                </div>
                <div className="col-sm">
                    <h3>Book a class and enjoy!</h3>
                    <p>Select the day and time for the class and make your payment through our swift and secure payment system.</p>
                </div>
            </div>
            <br/>
            <br/>
            <h4>Just don't miss a class...</h4>
        </div>
    )
}

export default ItsSimple;