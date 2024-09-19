import React, { useState } from 'react';
import './SearchBar.css'; // Add your CSS styles for the search bar here

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);  // 传递查询给父组件
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
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;