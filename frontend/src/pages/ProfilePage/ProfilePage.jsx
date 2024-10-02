import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import ProfileInfo from '../../components/ProfilePageComponent/ProfileInfo';
import ProfileForm from '../../components/ProfilePageComponent/ProfileForm';
import './css/ProfilePage.css';
import Cookies from 'js-cookie';

function ProfilePage() {
    const [user, setUser] = useState(null); // State to store user data
    const userId = Cookies.get('userId'); // Get userId from cookies

    // Fetch user data when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`/users/${userId}`)
                .then((response) => response.json())
                .then((data) => setUser(data))
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, [userId]);

    // Function to delete user profile
    const handleDeleteProfile = () => {
        if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            fetch(`/users/${userId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        // Redirect to homepage or login page after deletion
                        window.location.href = '/';
                    } else {
                        console.error('Error deleting profile:', response.statusText);
                    }
                })
                .catch((error) => console.error('Error deleting profile:', error));
        }
    };

    //logout function
    const handleLogout = () => {
        Cookies.remove('userId');
        window.location.href = '/';
    };

    if (!user) {
        return <div>Loading...</div>;
    }



    return (
        <main className="profilePage">
            <Sidebar playlists={user.playlists} />

            <section className="mainContent">
                <ProfileInfo user={user} />
                <ProfileForm user={user} setUser={setUser} />
                <button onClick={handleDeleteProfile} className="deleteProfileButton">
                    Delete Profile
                </button>
                <button onClick={handleLogout} className="logoutButton"> Logout
                </button>
            </section>

            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7819f84c8f69d4f9c2632c3a2968ac04b759bcf4eaac11b8c2cf84ae32f97bea?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                alt=""
                className="decorativeImage"
            />
        </main>
    );
}

export default ProfilePage;
