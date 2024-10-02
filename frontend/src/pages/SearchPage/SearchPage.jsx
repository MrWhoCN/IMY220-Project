import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import './css/SearchPage.css';
import Cookies from 'js-cookie';

function SearchPage() {
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const userId = Cookies.get('userId'); // Retrieve the current user's ID

    useEffect(() => {
        if (searchQuery) {
            // Fetch playlists matching the search query
            fetch(`/playlists?search=${encodeURIComponent(searchQuery)}`)
                .then((response) => response.json())
                .then((data) => setPlaylists(data))
                .catch((error) => console.error('Error fetching playlists:', error));

            // Fetch songs matching the search query
            fetch(`/songs?search=${encodeURIComponent(searchQuery)}`)
                .then((response) => response.json())
                .then((data) => setSongs(data))
                .catch((error) => console.error('Error fetching songs:', error));
        } else {
            setPlaylists([]);
            setSongs([]);
        }
    }, [searchQuery]);

    // Function to handle adding a playlist to the user's playlists
    const handleAddPlaylist = (playlistId) => {
        fetch(`/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistId }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Playlist added to your playlists.');
                    // Optionally, update the user's playlists here
                } else {
                    response.text().then((text) => {
                        alert(`Error adding playlist: ${text}`);
                    });
                }
            })
            .catch((error) => console.error('Error adding playlist:', error));
    };

    return (
        <div className="container">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />

            <div className="searchPage">
                <input
                    type="text"
                    placeholder="Search for playlists or songs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchInput"
                />

                <div className="searchResults">
                    <h2>Playlists</h2>
                    {playlists.length > 0 ? (
                        <ul>
                            {playlists.map((playlist) => (
                                <li key={playlist._id} className="playlistItem">
                                    <h3>{playlist.name}</h3>
                                    <p>Created by: {playlist.userId.username}</p>
                                    <button
                                        onClick={() => handleAddPlaylist(playlist._id)}
                                        className="addButton"
                                    >
                                        Add to My Playlists
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No playlists found.</p>
                    )}

                    <h2>Songs</h2>
                    {songs.length > 0 ? (
                        <ul>
                            {songs.map((song) => (
                                <li key={song._id} className="songItem">
                                    <h3>{song.name}</h3>
                                    {/* Add more song details as needed */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No songs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
