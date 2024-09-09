import React from 'react';
import './ProfileInfo.css';

function ProfileInfo() {
    return (
        <section className="profileInfo">
            <div className="profileHeader">
                <div className="avatarContainer">
                    <div className="avatar" />
                </div>
                <div className="userInfo">
                    <h1 className="userName">Mr. Who?</h1>
                    <p className="userEmail">JohnDoe@gmail.com</p>
                </div>
            </div>
            <div className="stats">
                <p className="followers">Followers: 199</p>
                <p className="following">Following: 199</p>
            </div>
        </section>
    );
}

export default ProfileInfo;