import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../index.css';

const menuItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c002322ed9301fa05d1d2e2c260a5ab47acd322ef33c59df82aa3b0c71ce698c?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Home", route: "/home" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Profile", route: "/profile" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a147527721f91dfa427e9277b4ebb7ff6a7e942f1b6c5b38354d4f75a311a626?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Create Playlist", route: "#" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Search", route: "/search" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "View Users", route: "/user" }
];

function Sidebar({ playlists = [], setPlaylists, addSongToPlaylist }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const navigate = useNavigate();
    const userId = Cookies.get('userId'); // Get userId from cookies

    // Updated useEffect to call the new API endpoint
    useEffect(() => {
        if (userId) {
            fetch(`/users/${userId}/playlists`)
                .then((response) => response.json())
                .then((data) => setPlaylists(data))
                .catch((error) => console.error('Error fetching user playlists:', error));
        }
    }, [userId, setPlaylists]);

    const handleCreatePlaylistClick = () => {
        setModalOpen(!isModalOpen);
    };

    const handleConfirm = () => {
        if (newPlaylistName.trim() && userId) {
            fetch('/playlists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newPlaylistName, userId })
            })
                .then(response => response.json())
                .then(newPlaylist => {
                    setPlaylists([...playlists, newPlaylist]);
                    setNewPlaylistName('');
                    setModalOpen(false);
                })
                .catch(error => console.error('Error creating playlist:', error));
        }
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    return (
        <aside className="w-64 bg-white text-orange-600 h-full flex flex-col justify-between shadow-md">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c992c37fcb060623411151c21f37ff30bf1b0e59c9a7f17c3a92eeb05468da?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                alt="Profile background"
                className="w-full h-32 object-cover rounded-t-lg"
            />
            <nav className="menu flex flex-col space-y-4 mt-4">
                {menuItems.map((item, index) => (
                    <div key={index} onClick={item.text === "Create Playlist" ? handleCreatePlaylistClick : null}>
                        <Link to={item.route} className="flex items-center p-4 hover:bg-orange-100 transition-all duration-300 ease-in-out transform hover:scale-105">
                            <img src={item.icon} alt={item.text} className="w-6 h-6 mr-4" />
                            <span className="font-semibold">{item.text}</span>
                        </Link>
                    </div>
                ))}
            </nav>
            <div className="playlistSection mt-6">
                <h3 className="text-lg font-bold mb-2">Playlists</h3>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div className="playlistItem cursor-pointer text-sm p-2 hover:bg-orange-100 rounded transition-all duration-300" key={index} onClick={() => handlePlaylistClick(playlist._id)}>
                            <a>{playlist.name}</a>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">No playlists available</div>
                )}
            </div>
            <footer className="text-gray-500 text-sm mt-6">
                <div className="flex flex-wrap justify-between space-x-2">
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">Legal</a>
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">Privacy Center</a>
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">Privacy Policy</a>
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">Cookies</a>
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">About</a>
                    <a href="#" className="hover:text-orange-600 transition-all duration-300">Ads</a>
                </div>
            </footer>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-xl mb-4 text-orange-600">Create a new playlist</h2>
                        <input
                            type="text"
                            placeholder="Enter playlist name"
                            value={newPlaylistName}
                            onChange={e => setNewPlaylistName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleConfirm} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-all duration-300">Confirm</button>
                            <button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
