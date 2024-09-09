import React from 'react';
import '../../pages/HomePage/css/SpotifyClone.css';

const PlaylistCard = ({ image, title, description }) => (
    <div className="playlistCard">
        <img loading="lazy" src={image} alt={title} className="playlistImage" />
        <div className="playlistInfo">
            <div className="playlistTitles">{title}</div>
            <div className="playlistDescription">{description}</div>
        </div>
    </div>
);

export default PlaylistCard;