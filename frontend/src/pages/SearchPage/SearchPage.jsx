import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Cookies from 'js-cookie';

function SearchPage() {
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(''); // Track selected playlist ID
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
            // If no search query, fetch all songs using the new `/songs` API
            fetch('/songs')
                .then((response) => response.json())
                .then((data) => setSongs(data))
                .catch((error) => console.error('Error fetching songs:', error));

            setPlaylists([]);
        }
    }, [searchQuery]);

    // Function to handle adding a song to a specific playlist
    const handleAddSongClick = (songId) => {
        if (!selectedPlaylistId) {
            alert('Please select a playlist to add the song.');
            return;
        }

        fetch(`/playlists/${selectedPlaylistId}/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Song added to playlist.');
                } else {
                    response.text().then((text) => {
                        alert(`Error adding song: ${text}`);
                    });
                }
            })
            .catch((error) => console.error('Error adding song:', error));
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />

            <div className="flex-1 p-6">
                <input
                    type="text"
                    placeholder="Search for playlists or songs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Dropdown to select a playlist */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Playlist to Add Songs</label>
                    <select
                        value={selectedPlaylistId}
                        onChange={(e) => setSelectedPlaylistId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">-- Select a Playlist --</option>
                        {playlists.map((playlist) => (
                            <option key={playlist._id} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Playlists</h2>
                    {playlists.length > 0 ? (
                        <ul className="space-y-4">
                            {playlists.map((playlist) => (
                                <li key={playlist._id} className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold text-gray-700">{playlist.name}</h3>
                                    <p className="text-sm text-gray-500">Created by: {playlist.userId.username}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No playlists found.</p>
                    )}

                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Songs</h2>
                    {songs.length > 0 ? (
                        <ul className="space-y-4">
                            {songs.map((song) => (
                                <li key={song._id} className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold text-gray-700">{song.title}</h3>
                                    <p className="text-sm text-gray-500">{song.artist} - {song.album}</p>
                                    <p className="text-sm text-gray-500">Duration: {song.duration}</p>
                                    <button
                                        onClick={() => handleAddSongClick(song._id)}
                                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                                    >
                                        Add to Playlist
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No songs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
