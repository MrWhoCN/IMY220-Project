import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';

const menuItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c002322ed9301fa05d1d2e2c260a5ab47acd322ef33c59df82aa3b0c71ce698c?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Home", route: "/home" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13579bfa832a66a45d9a5feed74a156dd763ca8ee8fd59d3727bb493f4286237?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Profile", route: "/profile" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a147527721f91dfa427e9277b4ebb7ff6a7e942f1b6c5b38354d4f75a311a626?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", text: "Create Playlist", route: "/playlist" }
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c992c37fcb060623411151c21f37ff30bf1b0e59c9a7f17c3a92eeb05468da?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                alt="Profile background" className="profileBackground"/>
            <nav className="menu">
                {menuItems.map((item, index) => (
                    <Link to={item.route} key={index} className="menuItem">
                        <img src={item.icon} alt={item.text} className="menuIcon"/>
                        <span>{item.text}</span>
                    </Link>
                ))}
            </nav>

            <div className="playlistSection">
                <h3>Playlists</h3>
                <div className="playlistItem">
                    <Link to="/playlist">
                        <a>Playlist 1</a>
                    </Link>
                </div>
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
        </aside>
    );
}

export default Sidebar;