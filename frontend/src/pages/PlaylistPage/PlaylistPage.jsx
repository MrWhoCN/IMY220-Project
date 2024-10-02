import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Playlist from '../../components/PlayListComponent/Playlist';
import './css/PlaylistPage.css';
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
        <div className="playlistPage">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />
            <main className="mainContent">
                {error ? (
                    <div className="error">{error}</div>
                ) : (
                    playlist &&
                    creator && (
                        <>
                            <h2>{playlist.name}</h2>
                            <p>Created by: {creator.username}</p>
                            {/* Show Follow/Unfollow button if the creator is not the current user */}
                            {creator._id !== userId && (
                                <button onClick={handleFollowClick} className="followButton">
                                    {isFollowing ? 'Unfollow' : 'Follow'} {creator.username}
                                </button>
                            )}
                            <Playlist searchQuery="" playlistId={playlist._id} songs={playlist.songs} />
                            <div className="buttonContainer">
                                <button className="addSongButton" onClick={handleAddSongClick}>
                                    Add Song
                                </button>
                                <button className="deleteButton" onClick={handleDeletePlaylist}>
                                    Delete Playlist
                                </button>
                            </div>
                            {isAddSongFormOpen && (
                                <form className="addSongForm" onSubmit={handleAddSongSubmit}>
                                    <h3>Add New Song</h3>
                                    {errorMessage && <div className="error">{errorMessage}</div>}
                                    <div className="formGroup">
                                        <label>Title*</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={newSong.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <label>Artist*</label>
                                        <input
                                            type="text"
                                            name="artist"
                                            value={newSong.artist}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <label>Album</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={newSong.album}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <label>Album Cover URL</label>
                                        <input
                                            type="text"
                                            name="albumCover"
                                            value={newSong.albumCover}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <label>Date Added</label>
                                        <input
                                            type="date"
                                            name="dateAdded"
                                            value={newSong.dateAdded}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <label>Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={newSong.duration}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="formButtons">
                                        <button type="submit" className="submitButton">
                                            Add Song
                                        </button>
                                        <button
                                            type="button"
                                            className="cancelButton"
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
