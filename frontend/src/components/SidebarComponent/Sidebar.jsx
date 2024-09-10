import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Sidebar.css';

const menuItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c002322ed9301fa05d1d2e2c260a5ab47acd322ef33c59df82aa3b0c71ce698c?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Home", route: "/home" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Profile", route: "/profile" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a147527721f91dfa427e9277b4ebb7ff6a7e942f1b6c5b38354d4f75a311a626?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Create Playlist", route: "#" }
];

function Sidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate(); // Use useNavigate for navigation

    // Function to toggle the modal
    const handleCreatePlaylistClick = () => {
        setModalOpen(!isModalOpen);
    };

    // Function to handle the input change for playlist name
    const handlePlaylistNameChange = (e) => {
        setNewPlaylistName(e.target.value);
    };

    // Function to confirm and create the playlist
    const handleConfirm = () => {
        if (newPlaylistName.trim()) {
            setPlaylists([...playlists, { name: newPlaylistName, route: `/playlist/${newPlaylistName}` }]);
            setNewPlaylistName('');
            setModalOpen(false);
        }
    };

    // Function to navigate to the newly created playlist page
    const handlePlaylistClick = (route) => {
        navigate(route); // Use navigate instead of history.push
    };

    return (
        <aside className="sidebar">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c992c37fcb060623411151c21f37ff30bf1b0e59c9a7f17c3a92eeb05468da?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                alt="Profile background" className="profileBackground"/>

            <nav className="menu">
                {menuItems.map((item, index) => (
                    <div key={index} onClick={item.text === "Create Playlist" ? handleCreatePlaylistClick : null}>
                        <Link to={item.route} className="menuItem">
                            <img src={item.icon} alt={item.text} className="menuIcon"/>
                            <span>{item.text}</span>
                        </Link>
                    </div>
                ))}
            </nav>

            <div className="playlistSection">
                <h3>Playlists</h3>
                {playlists.map((playlist, index) => (
                    <div className="playlistItem" key={index} onClick={() => handlePlaylistClick(playlist.route)}>
                        <a>{playlist.name}</a>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <div className="footerLinks">
                    <a href="#">Legal</a>
                    <a href="#">Privacy Center</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookies</a>
                    <a href="#">About</a>
                    <a href="#">Ads</a>
                </div>
            </footer>

            {/* Modal for creating new playlist */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>Create a new playlist</h2>
                        <input
                            type="text"
                            placeholder="Enter playlist name"
                            value={newPlaylistName}
                            onChange={handlePlaylistNameChange}
                        />
                        <button onClick={handleConfirm}>Confirm</button>
                        <button onClick={() => setModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;