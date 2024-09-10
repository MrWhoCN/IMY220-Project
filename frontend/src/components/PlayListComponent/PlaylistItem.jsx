import React from 'react';
import './PlaylistItem.css';

const PlaylistItem = ({ number, albumCover, title, artist, album, dateAdded, duration, onDelete }) => {
    return (
        <div className="playlistItem">
            <div className="itemColumn">
                <span className="itemNumber">{number}</span>
                <div className="songInfo">
                    <img src={albumCover} className="albumCoverImage" alt={title} />
                    <div className="titleArtist">
                        <span className="songTitle">{title}</span>
                        <span className="artistName">{artist}</span>
                    </div>
                </div>
            </div>
            <div className="itemColumn">
                <span className="albumName">{album}</span>
                <span className="dateAdded">{dateAdded}</span>
                <div className="durationControls">
                    <span className="duration">{duration}</span>
                    {/* Delete button */}
                    <button className="deleteButton" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistItem;
