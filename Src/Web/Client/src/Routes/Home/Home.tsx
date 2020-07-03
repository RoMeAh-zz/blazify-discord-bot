import React, { useState } from "react";
import "./Home.css"

export default function Home() {
    const [redirect, setRedirect] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");

    let login = async () => {
        if (!redirect) {
            try {
                const response = await fetch("http://localhost:8080/api/auth");
                const data = await response.json();
                if (!data.success) return alert("An error occurred!");
                setRedirect(true);
                setRedirectUrl(data.redirect);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (redirect && redirectUrl !== "") {
        window.location.href = redirectUrl;
    }
        return (
            <div className="main">
                <div className="animation">
                    <div className="star"/>
                    <div className="star"/>
                    <div className="star"/>
                    <div className="star"/>
                    <div className="star"/>
                </div>
                <div className="container">
                    <div className="menu">
                        <ul>
                            <li className="active">Home</li>
                            <li>Bot Info</li>
                            <li>Server Info</li>
                            <li>Invite Bot</li>
                            <li>Join Server</li>
                        </ul>
                    </div>

                <div className="btn">
                    <button onClick={() => login()} className="button">Login</button>
                </div>

                <div className="banner">
                    <div className="app-text">
                        <h1>Meet Blazify, <br/> a Feature Rich Discord Bot</h1>
                        <p>
                            Blazify is a new Discord Bot that started development in March of 2020, and we are proud to
                            announce that it is now a fully fledged multi-purpose Discord Bot. Click on "Bot Info" to
                            learn more.
                        </p>
                        <div className="play-btn">
                            <div className="play-btn-inner">
                                <i className="fa fa-play"/></div>
                        </div>
                        <small><b>Learn More</b></small>
            </div>
                </div>
                    <div className="quick-link">
                        <ul>
                            <li><i className="fa fa-share-alt"/><p>Share others</p></li>
                            <li><i className="fa fa-audio-description"/><p>Chat App</p></li>
                            <li><i className="fa fa-cog"/><p>System Stats of VPS</p></li>
                        </ul>
                    </div>
                    <div className="social-media-icons">
                        <ul>
                            <li><a href="https://twitter.com/ABlazify"><i className="fa fa-twitter"/></a></li>
                            <li><a href="https://instagram.com/b3_romeah_yt"><i className="fa fa-instagram"/></a></li>
                            <li><a href="https://gmail.com"><i className="fa fa-envelope"/></a></li>
                        </ul>
                    </div>
                    </div>
            </div>
        )
}