import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

const menuItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c002322ed9301fa05d1d2e2c260a5ab47acd322ef33c59df82aa3b0c71ce698c?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Home", route: "/home" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Profile", route: "/profile" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a147527721f91dfa427e9277b4ebb7ff6a7e942f1b6c5b38354d4f75a311a626?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Create Playlist", route: "#" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Search", route: "/search" }
];

function Sidebar({ playlists = [], setPlaylists, addSongToPlaylist }) {  // Set a default empty array for playlists
    const [isModalOpen, setModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const navigate = useNavigate();

    const userId = Cookies.get('userId'); // Get userId from cookies

    // Fetch playlists when the component mounts
    useEffect(() => {
        fetch('/playlists')
            .then((response) => response.json())
            .then((data) => setPlaylists(data))
            .catch((error) => console.error('Error fetching playlists:', error));
    }, [setPlaylists]);

    const handleCreatePlaylistClick = () => {
        setModalOpen(!isModalOpen);
    };

    const handlePlaylistNameChange = (e) => {
        setNewPlaylistName(e.target.value);
    };

    const handleConfirm = () => {
        if (newPlaylistName.trim() && userId) {
            fetch('/playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newPlaylistName, userId })
            })
                .then((response) => response.json())
                .then((newPlaylist) => {
                    // Update playlists state with the newly created playlist
                    setPlaylists([...playlists, newPlaylist]);
                    setNewPlaylistName('');
                    setModalOpen(false);
                })
                .catch((error) => console.error('Error creating playlist:', error));
        }
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
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
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div className="playlistItem" key={index}  onClick={() => handlePlaylistClick(playlist._id)}>
                            <a>{playlist.name}</a>
                        </div>
                    ))
                ) : (
                    <div>No playlists available</div>
                )}
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
