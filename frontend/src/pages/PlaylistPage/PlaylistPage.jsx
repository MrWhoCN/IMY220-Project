import React, { useState } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Playlist from '../../components/PlayListComponent/Playlist';
import './css/PlaylistPage.css';

const PlaylistPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="playlistPage">
            <Sidebar />
            <main className="mainContent">
                {/* Search Bar */}
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="searchInput"
                    />
                </div>
                {/* Pass search query to Playlist component */}
                <Playlist searchQuery={searchQuery} />
            </main>
        </div>
    );
};

export default PlaylistPage;