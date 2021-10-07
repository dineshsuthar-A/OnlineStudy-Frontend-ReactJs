import React, { useState } from 'react';
import './main.css';
import { Avatar } from '@material-ui/core';
import batches from './asset/batches.png';
import mock from './asset/mock.png';
import notes from './asset/notes.png';
import down from './asset/Apk.png';
import { useHistory } from 'react-router-dom';


export default function Main() {
    const history = useHistory();
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);

    const redirectApk = () => {
        window.open("https://play.google.com/store/apps/details?id=com.asdevsoft.onlinetest", "_blank");
    }
    const handleLoginClick = () => {
        history.push("/login");
    }

    return (
        <div>
            <div className={(colorChange) ? "navigationBar2" : "navigationBar-main"}>
                <p className="navBarTitleLogo">GYAN EDUCATION</p>
                <p className="loginMenu" onClick={handleLoginClick}>Login</p>
            </div>
            <div className="imgBackgroundDiv">
                <p className='Description'>Gyan Education is FREE for exams like SSC CHSL, SSC CGL, SSC CPO, SSC GD Constable, RRB JE, RPF, GATE, SBI PO 2020, IBPS PO 2020, SBI Clerk, IBPS Clerk, IBPS RRB Office Assistant 2020, IBPS RRB Officer Scale I, IBPS SO, Bank of Baroda PO, RBI Grade B, RBI Assistant, NIACL AO, LIC AAO .<br /><br />
                    Students who are preparing for Railway RRB Exam 2020 and other exam can use our platform. Railway department is the most popular department in India. Every Year Railway conduct the exams for assistant loco pilot, railway group D, railway rrb NTPC and Railway junior engineer. Railway loco pilot and technician post are most popular and Group C ,D is also the most popular exam in India.</p>
            </div>

            <div className="dis">
                <h3 className="headingFeatures">What we have for you?</h3>

                <div className="featureCards">
                    <div className="cardFeature">
                        <Avatar src={batches} alt="Not Loaded" style={{ width: "60px", height: "60px" }} />
                        <h2 className="cardHeader">BATCHES</h2>
                        <p className="cardDiscription">We have 30+ different batches to help you prepare for anything.</p>
                    </div>
                    <div className="cardFeature">
                        <Avatar src={mock} alt="Not Loaded" style={{ width: "60px", height: "60px" }} />
                        <h2 className="cardHeader">Mock Test</h2>
                        <p className="cardDiscription">We have a series of mock test for different competative exams.</p>
                    </div>
                    <div className="cardFeature">
                        <Avatar src={notes} alt="Not Loaded" style={{ width: "60px", height: "60px" }} />
                        <h2 className="cardHeader">Notes</h2>
                        <p className="cardDiscription">We prepare the student with our own personalized notes.(Only for mobile application users.)</p>
                    </div>
                </div>

            </div>

            <hr />
            <div className="footerMain">
                <div className="contact">
                    <p className="contactus" >Contact Us</p>
                    <p> <span style={{ color: "black", marginLeft: "10px", fontWeight: "bold" }}>Mobile </span>+91-9876543320</p>
                    <p> <span style={{ color: "black", marginLeft: "10px", fontWeight: "bold" }}>What's App </span>+91-9876543320</p>
                    <p> <span style={{ color: "black", marginLeft: "10px", fontWeight: "bold" }}>SMS </span>+91-9876543320</p>

                </div>
                <img className="imageApk" src={down} alt="Sorry not loaded" style={{ marginRight: "60px", marginBottom: "20px", cursor: "pointer" }} onClick={() => redirectApk()} />
            </div>
        </div >
    )
}
