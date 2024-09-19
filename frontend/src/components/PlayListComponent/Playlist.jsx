import React, { useState, useEffect } from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistItem from './PlaylistItem';
import CommentsSection from '../CommentComponent/CommentSection'; // 确保路径正确
import './Playlist.css';

const Playlist = ({ playlistId, searchQuery, addSongToPlaylist }) => {
    const [playlistData, setPlaylistData] = useState([]); // Initially empty
    const [playlistName, setPlaylistName] = useState("Your Playlist");
    const [isEditingName, setIsEditingName] = useState(false);

    const normalizedSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';

    // Filter playlist data based on search query
    const filteredPlaylistData = playlistData.filter(
        (song) =>
            song.title.toLowerCase().includes(normalizedSearchQuery) ||
            song.artist.toLowerCase().includes(normalizedSearchQuery) ||
            song.album.toLowerCase().includes(normalizedSearchQuery)
    );

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`/playlists/${playlistId}/songs`);  // 使用 playlistId
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist');
                }
                const data = await response.json();
                setPlaylistData(data); // Assuming the response is an array of songs
                setPlaylistName(data.name); // Assuming the playlist name is also in the response
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        if (playlistId) {
            fetchPlaylist();
        }
    }, [playlistId]);

    const handleDelete = async (songId) => {
        try {
            // 发起 DELETE 请求到后端
            const response = await fetch(`/playlists/${playlistId}/songs/${songId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the song');
            }

            const updatedPlaylist = playlistData.filter((song) => song._id !== songId);  // 使用 song._id 而不是 number
            setPlaylistData(updatedPlaylist);

            console.log('Song deleted successfully');
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleEditPlaylistName = () => {
        setIsEditingName(true);
    };

    const handleNameChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleSaveName = () => {
        setIsEditingName(false);
    };

    return (
        <section className="playlistSection">
            <div className="playlistName">
                {isEditingName ? (
                    <div>
                        <input
                            type="text"
                            value={playlistName}
                            onChange={handleNameChange}
                            className="playlistNameInput"
                        />
                        <button onClick={handleSaveName} className="saveButton">Save</button>
                    </div>
                ) : (
                    <div>
                        <h2>{playlistName}</h2>
                        <button onClick={handleEditPlaylistName} className="editButton">Edit Name</button>
                    </div>
                )}
            </div>

            <PlaylistHeader />
            <div className="playlistItems">
                {filteredPlaylistData.length > 0 ? (
                    filteredPlaylistData.map((item, index) => (
                        <PlaylistItem
                            key={index}
                            {...item}
                            onDelete={() => handleDelete(item._id)}
                        />
                    ))
                ) : (
                    <div className="noResultsMessage">No songs match your search.</div>
                )}
            </div>

            {/* 传递 playlistId 到 CommentsSection */}
            <CommentsSection playlistId={playlistId} />
        </section>
    );
};

export default Playlist;
