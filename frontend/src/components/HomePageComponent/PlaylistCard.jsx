import React, { useState } from 'react';
import '../../pages/HomePage/css/SpotifyClone.css';

const PlaylistCard = ({ image, title, description, onAdd }) => {
    // Local state to manage whether there are playlists
    const [playlists, setPlaylists] = useState([]); // Simulating playlists; replace this with real playlists state from your app
    const [message, setMessage] = useState('');

    // Handle add button click
    const handleAddClick = () => {
        if (playlists.length > 0) {
            onAdd(title); // Call the passed function to handle adding a song
            setMessage(`"${title}" added to your playlist.`);
        } else {
            setMessage('Please create a playlist before adding songs.');
        }
    };

    return (
        <div className="playlistCard">
            <img loading="lazy" src={image} alt={title} className="playlistImage" />
            <div className="playlistInfo">
                <div className="playlistTitles">{title}</div>
                <div className="playlistDescription">{description}</div>
            </div>
            {/* Add button */}
            <button className="addButton" onClick={handleAddClick}>Add</button>
            {/* Message to the user */}
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default PlaylistCard;
