import React, { useState } from 'react';
import './SearchBar.css'; // Add your CSS styles for the search bar here

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value); // Call the onSearch function passed from the parent
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={handleInputChange}
                className="searchInput"
            />
        </div>
    );
}

export default SearchBar;