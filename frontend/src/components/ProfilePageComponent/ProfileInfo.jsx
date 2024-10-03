import React from 'react';

function ProfileInfo({ user }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {user.username}'s Profile
            </h1>
            <p className="text-gray-600">
                Followers: <span className="font-semibold">{user.followers.length}</span>
            </p>
            <p className="text-gray-600">
                Following: <span className="font-semibold">{user.following.length}</span>
            </p>
        </div>
    );
}

export default ProfileInfo;
