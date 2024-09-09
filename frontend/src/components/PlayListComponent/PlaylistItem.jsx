import React, { useState } from 'react';
import './PlaylistItem.css';

const PlaylistItem = ({ number, albumCover, title, artist, album, dateAdded, duration, onDelete }) => {
    // State to track if the delete option should be visible
    const [showDelete, setShowDelete] = useState(false);

    // Function to toggle the visibility of the delete option
    const toggleDeleteOption = () => {
        setShowDelete(!showDelete);
    };

    return (
        <div className="playlistItem">
            <div className="itemColumn">
                <span className="itemNumber">{number}</span>
                <div className="songInfo">
                   <img src={albumCover} className= "albumCoverImage" alt={title}/>
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
                    <div className="moreOptions" onClick={toggleDeleteOption}>
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </div>
                    {/* Conditional rendering for the delete option */}
                    {showDelete && (
                        <div className="deleteOption" onClick={onDelete}>
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaylistItem;