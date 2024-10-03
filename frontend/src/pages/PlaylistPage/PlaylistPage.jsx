import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Playlist from '../../components/PlayListComponent/Playlist';
import Cookies from 'js-cookie';

const PlaylistPage = () => {
    const [playlist, setPlaylist] = useState(null); // Holds the specific playlist data
    const [playlists, setPlaylists] = useState([]); // Holds all playlists for the sidebar
    const { playlistId } = useParams(); // Get playlistId from the URL
    const userId = Cookies.get('userId'); // Get userId from cookies
    const navigate = useNavigate(); // For navigation
    const [error, setError] = useState(''); // Holds any error message

    // New state variables for following functionality
    const [creator, setCreator] = useState(null); // Holds the creator's data
    const [currentUser, setCurrentUser] = useState(null); // Holds the current user's data
    const [isFollowing, setIsFollowing] = useState(false); // Whether current user is following the creator

    // Existing state variables for adding a song
    const [isAddSongFormOpen, setIsAddSongFormOpen] = useState(false);
    const [newSong, setNewSong] = useState({
        title: '',
        albumCover: '',
        artist: '',
        album: '',
        dateAdded: '',
        duration: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch playlists for sidebar and the specific playlist for the page
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    // Fetch all playlists for sidebar
                    const playlistsResponse = await fetch(`/playlists?userId=${userId}`);
                    const playlistsData = await playlistsResponse.json();
                    setPlaylists(playlistsData);

                    // Fetch the specific playlist by playlistId
                    const playlistResponse = await fetch(`/playlists/${playlistId}`);
                    if (!playlistResponse.ok) {
                        throw new Error('Playlist not found');
                    }
                    const playlistData = await playlistResponse.json();
                    setPlaylist(playlistData);
                    const creatorData = playlistData.userId; // Assuming userId is populated with creator's info
                    setCreator(creatorData);

                    // Fetch the current user's data
                    const userResponse = await fetch(`/users/${userId}`);
                    if (!userResponse.ok) {
                        throw new Error('User not found');
                    }
                    const userData = await userResponse.json();
                    setCurrentUser(userData);

                    // Check if current user is following the creator
                    const isUserFollowing = userData.following.some(
                        (followedUser) => followedUser._id === creatorData._id
                    );
                    setIsFollowing(isUserFollowing);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data');
                }
            }
        };

        fetchData();
    }, [userId, playlistId]);

    // Handle follow/unfollow click
    const handleFollowClick = () => {
        const endpoint = isFollowing ? `/users/${creator._id}/unfollow` : `/users/${creator._id}/follow`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ followerId: userId }), // Send followerId in request body
        })
            .then((response) => {
                if (response.ok) {
                    setIsFollowing(!isFollowing);
                } else {
                    response.text().then((text) => {
                        console.error(`Error: ${text}`);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Handle delete playlist
    const handleDeletePlaylist = () => {
        fetch(`/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }), // Send userId in request body
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/home');
                } else {
                    console.error('Error deleting playlist:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting playlist:', error));
    };

    // Handle Add Song button click
    const handleAddSongClick = () => {
        setIsAddSongFormOpen(true);
    };

    // Handle input changes in the add song form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSong((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle add song form submission
    const handleAddSongSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!newSong.title || !newSong.artist) {
            setErrorMessage('Title and artist are required.');
            return;
        }

        // Send POST request to add the song
        fetch('/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSong),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
            })
            .then((createdSong) => {
                console.log('Song added:', createdSong);
                // Now add the song to the current playlist
                return fetch(`/playlists/${playlistId}/songs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ songId: createdSong._id }),
                });
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
            })
            .then((data) => {
                console.log('Song added to playlist:', data);
                setIsAddSongFormOpen(false);
                setErrorMessage('');
                // Clear the form
                setNewSong({
                    title: '',
                    albumCover: '',
                    artist: '',
                    album: '',
                    dateAdded: '',
                    duration: '',
                });
                // Update the playlist in state to include the new song
                setPlaylist((prevPlaylist) => ({
                    ...prevPlaylist,
                    songs: data.playlist.songs,
                }));
                // Reload the page
                navigate(`/playlist/${playlistId}`);
            })
            .catch((error) => {
                console.error('Error adding song:', error);
                setErrorMessage('Error adding song to playlist.');
            });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />
            <main className="flex-1 p-6">
                {error ? (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                ) : (
                    playlist &&
                    creator && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{playlist.name}</h2>
                            <p className="text-gray-600 mb-4">Created by: {creator.username}</p>
                            {creator._id !== userId && (
                                <button
                                    onClick={handleFollowClick}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'} {creator.username}
                                </button>
                            )}
                            <Playlist searchQuery="" playlistId={playlist._id} songs={playlist.songs} />
                            <div className="flex space-x-4 mt-6">
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                                    onClick={handleAddSongClick}
                                >
                                    Add Song
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                    onClick={handleDeletePlaylist}
                                >
                                    Delete Playlist
                                </button>
                            </div>
                            {isAddSongFormOpen && (
                                <form
                                    className="mt-6 bg-white p-6 rounded-lg shadow-md"
                                    onSubmit={handleAddSongSubmit}
                                >
                                    <h3 className="text-xl font-bold mb-4">Add New Song</h3>
                                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Title*</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={newSong.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Artist*</label>
                                        <input
                                            type="text"
                                            name="artist"
                                            value={newSong.artist}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Album</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={newSong.album}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Album Cover URL</label>
                                        <input
                                            type="text"
                                            name="albumCover"
                                            value={newSong.albumCover}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Date Added</label>
                                        <input
                                            type="date"
                                            name="dateAdded"
                                            value={newSong.dateAdded}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={newSong.duration}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            Add Song
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                            onClick={() => setIsAddSongFormOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    )
                )}
            </main>
        </div>
    );

};

export default PlaylistPage;
