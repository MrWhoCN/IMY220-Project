import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            console.log('Search query:', query); // Check if the search query is correctly captured
            onSearch(query); // Pass the query to the parent component
        } else {
            console.log('Search query is empty');
        }
    };


    return (
        <div className="searchBar">
            <input
                type="text"
                placeholder="Search playlists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="searchInput"
            />
        </div>
    );
};

export default SearchBar;
