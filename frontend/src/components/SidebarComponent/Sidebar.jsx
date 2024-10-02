import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../index.css'

const menuItems = [
    { icon: "icon-url", text: "Home", route: "/home" },
    { icon: "icon-url", text: "Profile", route: "/profile" },
    { icon: "icon-url", text: "Create Playlist", route: "#" },
    { icon: "icon-url", text: "Search", route: "/search" },
    { icon: "icon-url", text: "View Users", route: "/user" }
];

function Sidebar({ playlists = [], setPlaylists, addSongToPlaylist }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    useEffect(() => {
        fetch('/playlists')
            .then((response) => response.json())
            .then((data) => setPlaylists(data))
            .catch((error) => console.error('Error fetching playlists:', error));
    }, [setPlaylists]);

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
        <aside className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
            <img
                src="image-url"
                alt="Profile background"
                className="w-full h-32 object-cover"
            />
            <nav className="menu flex flex-col space-y-4 mt-4">
                {menuItems.map((item, index) => (
                    <div key={index} onClick={item.text === "Create Playlist" ? handleCreatePlaylistClick : null}>
                        <Link to={item.route} className="flex items-center p-4 hover:bg-gray-700 transition-all">
                            <img src={item.icon} alt={item.text} className="w-6 h-6 mr-4" />
                            <span>{item.text}</span>
                        </Link>
                    </div>
                ))}
            </nav>
            <div className="playlistSection mt-6">
                <h3 className="text-lg font-semibold mb-2">Playlists</h3>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div className="playlistItem cursor-pointer text-sm p-2 hover:bg-gray-700 rounded" key={index} onClick={() => handlePlaylistClick(playlist._id)}>
                            <a>{playlist.name}</a>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">No playlists available</div>
                )}
            </div>
            <footer className="text-gray-400 text-sm mt-6">
                <div className="flex flex-wrap justify-between">
                    <a href="#" className="hover:text-white">Legal</a>
                    <a href="#" className="hover:text-white">Privacy Center</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Cookies</a>
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Ads</a>
                </div>
            </footer>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-xl mb-4">Create a new playlist</h2>
                        <input
                            type="text"
                            placeholder="Enter playlist name"
                            value={newPlaylistName}
                            onChange={e => setNewPlaylistName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Confirm</button>
                            <button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
