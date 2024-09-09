import React from 'react';
import  './PlaylistHeader.css';

const PlaylistHeader = () => (
    <header className="playlistHeader">
        <h1 className="playlistTitle">Your Playlist</h1>
        <div className="headerRow">
            <div className="headerColumn">
                <span className="headerNumber">#</span>
                <span className="headerTitle">Title</span>
            </div>
            <div className="headerColumn">
                <span className="headerAlbum">Album</span>
                <span className="headerDateAdded">Date added</span>
                <span className="headerDuration">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/66526df9bcdef2c42f8bcee05164c4b48a415acdd561b2ee64b1e60a23dd3886?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346" alt="Duration icon" className="durationIcon" />
        </span>
            </div>
        </div>
    </header>
);

export default PlaylistHeader;