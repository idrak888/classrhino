import React from 'react';
import '../styles/Home.css';

import BelowHeader from '../components/BelowHeader';
import BrowsingModule from '../components/BrowsingModule';
import HereToHelp from '../components/HereToHelp';
import ItsSimple from '../components/ItsSimple';
import ScreenSharing from '../components/ScreenSharing';
import OurTeachers from '../components/OurTeachers';
import WhyWait from '../components/WhyWait';

import Fade from 'react-reveal/Fade';

class Home extends React.Component {
    render () {
        return (
            <div className="Home">
                <BrowsingModule/>
                <BelowHeader/>
                <Fade>
                    <HereToHelp/>
                </Fade>
                <Fade>
                    <ItsSimple/>
                </Fade>
                <Fade>
                    <ScreenSharing/>
                </Fade>
                <Fade>
                    <OurTeachers/>
                </Fade>
                <WhyWait/>
            </div>  
        )
    }
}

export default Home;