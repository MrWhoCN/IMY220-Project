import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Cookies from 'js-cookie';

const UserProfilePage = () => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current user's ID from cookies
        const userId = Cookies.get('userId');
        setCurrentUserId(userId);

        if (userId) {
            // Fetch current user's data
            fetch(`/users/${userId}`)
                .then((response) => response.json())
                .then((data) => setCurrentUser(data))
                .catch((error) => console.error('Error fetching current user data:', error));
        }

        // Fetch all users with their playlists populated
        fetch('/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const handleAddPlaylist = (playlistId) => {
        if (!currentUserId) {
            alert('Please log in to add playlists.');
            return;
        }

        fetch(`/users/${currentUserId}/playlists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlistId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Playlist added:', data);
                alert('Playlist added successfully!');
            })
            .catch((error) => {
                console.error('Error adding playlist:', error);
                alert('Error adding playlist.');
            });
    };

    if (!users.length || !currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <main className="userProfilePage">
            <Sidebar playlists={currentUser.playlists} />
            <section className="mainContent">
                {users.map((user) => (
                    <div key={user._id} className="userProfile">
                        <img
                            src={user.avatar || '/defaultAvatar.png'}
                            alt="User Avatar"
                            className="userAvatar"
                        />
                        <div className="userInfo">
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                        </div>
                        <h2>Playlists</h2>
                        <div className="playlists">
                            {user.playlists &&
                                user.playlists.map((playlist) => (
                                    <div key={playlist._id} className="playlist">
                                        <img
                                            src={playlist.image || '/defaultPlaylistImage.png'}
                                            alt="Playlist Cover"
                                        />
                                        <h3>{playlist.name}</h3>
                                        <button onClick={() => handlePlaylistClick(playlist._id)}>
                                            View Playlist
                                        </button>
                                        <button onClick={() => handleAddPlaylist(playlist._id)}>
                                            Add Playlist
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default UserProfilePage;
