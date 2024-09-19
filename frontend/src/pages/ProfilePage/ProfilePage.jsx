import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import ProfileInfo from '../../components/ProfilePageComponent/ProfileInfo';
import ProfileForm from '../../components/ProfilePageComponent/ProfileForm';
import './css/ProfilePage.css';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

function ProfilePage() {
    const [playlists, setPlaylists] = useState([]); // State to store playlists

    const userId = Cookies.get('userId'); // Get userId from cookies

    // Fetch playlists when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`/playlists?userId=${userId}`)
                .then((response) => response.json())
                .then((data) => setPlaylists(data))
                .catch((error) => console.error('Error fetching playlists:', error));
        }
    }, [userId]);

    return (
        <main className="profilePage">
            {/* Pass the playlists to Sidebar */}
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />

            <section className="mainContent">
                <ProfileInfo />
                <ProfileForm />
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
