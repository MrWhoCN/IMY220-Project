import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Playlist from '../../components/PlayListComponent/Playlist';
import './css/PlaylistPage.css';

const PlaylistPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { playlistName } = useParams();  // Access the playlist name from the route

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="playlistPage">
            {/* Sidebar for navigation */}
            <Sidebar />

            <main className="mainContent">
                {/* Search Bar */}
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder={`Search songs in ${playlistName}...`}  // Use playlistName in the placeholder
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="searchInput"
                    />
                </div>

                {/* Render Playlist component with search functionality */}
                <Playlist searchQuery={searchQuery} playlistName={playlistName} />
            </main>
        </div>
    );
};

export default PlaylistPage;
