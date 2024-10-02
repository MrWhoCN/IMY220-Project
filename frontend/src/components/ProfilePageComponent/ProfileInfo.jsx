import React from 'react';
import './ProfileInfo.css';

function ProfileInfo({ user }) {
    return (
        <div className="profileInfo">
            <h1>{user.username}'s Profile</h1>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
        </div>
    );
}


export default ProfileInfo;