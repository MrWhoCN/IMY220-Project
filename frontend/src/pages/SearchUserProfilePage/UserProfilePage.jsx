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
        <main className="flex min-h-screen bg-gray-100">
            <Sidebar playlists={currentUser.playlists} />

            <section className="flex-1 p-6">
                {users.map((user) => (
                    <div key={user._id} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={user.avatar || '/defaultAvatar.png'}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div className="userInfo">
                                <h1 className="text-2xl font-semibold text-gray-800">{user.username}</h1>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Playlists</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.playlists &&
                                user.playlists.map((playlist) => (
                                    <div key={playlist._id} className="bg-gray-50 p-4 rounded-lg shadow">
                                        <img
                                            src={playlist.image || '/defaultPlaylistImage.png'}
                                            alt="Playlist Cover"
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">{playlist.name}</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handlePlaylistClick(playlist._id)}
                                                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                View Playlist
                                            </button>
                                            <button
                                                onClick={() => handleAddPlaylist(playlist._id)}
                                                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                                            >
                                                Add Playlist
                                            </button>
                                        </div>
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
