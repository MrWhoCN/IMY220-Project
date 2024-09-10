import React, { useState } from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistItem from './PlaylistItem';
import './Playlist.css';

const initialPlaylistData = [
    {
        number: 1,
        title: "So Far So Good",
        albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346",
        artist: "Sun Of They",
        album: "Silent Hills",
        dateAdded: "1 week ago",
        duration: "2:31",
    },
    {
        number: 2,
        title: "Another Day",
        albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346",
        artist: "Artist X",
        album: "Dreamscape",
        dateAdded: "2 weeks ago",
        duration: "3:45",
    },
    {
        number: 3,
        title: "Lost in Time",
        albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346",
        artist: "Unknown Artist",
        album: "Infinity",
        dateAdded: "3 days ago",
        duration: "4:12",
    },
    {
        number: 4,
        title: "Journey",
        albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346",
        artist: "Sun Of They",
        album: "Silent Hills",
        dateAdded: "1 week ago",
        duration: "2:31",
    },
];

const Playlist = ({ searchQuery, songs = [], playlistName, addSongToPlaylist }) => {
    // Use initialPlaylistData if songs is empty
    const [playlistData, setPlaylistData] = useState(songs.length > 0 ? songs : initialPlaylistData);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const normalizedSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';

    const filteredPlaylistData = playlistData.filter(
        (song) =>
            song.title.toLowerCase().includes(normalizedSearchQuery) ||
            song.artist.toLowerCase().includes(normalizedSearchQuery) ||
            song.album.toLowerCase().includes(normalizedSearchQuery)
    );

    const handleDelete = (number) => {
        const updatedPlaylist = playlistData.filter((song) => song.number !== number);
        setPlaylistData(updatedPlaylist);
    };

    const handleAddSong = (newSong) => {
        setPlaylistData([...playlistData, newSong]);
        addSongToPlaylist(playlistName, newSong);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment(''); // Clear input field after adding the comment
        }
    };

    return (
        <section className="playlistSection">
            <PlaylistHeader />
            <div className="playlistItems">
                {filteredPlaylistData.length > 0 ? (
                    filteredPlaylistData.map((item) => (
                        <PlaylistItem
                            key={item.number}
                            {...item}
                            onDelete={() => handleDelete(item.number)}
                        />
                    ))
                ) : (
                    <div className="noResultsMessage">No songs match your search.</div>
                )}
            </div>

            {/* Comment Section */}
            <div className="commentSection">
                <h3>Comments</h3>
                <div className="commentInput">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Leave a comment..."
                    />
                    <button onClick={handleAddComment}>Submit</button>
                </div>
                <div className="commentsList">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="commentItem">
                                {comment}
                            </div>
                        ))
                    ) : (
                        <div className="noCommentsMessage">No comments yet. Be the first to comment!</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Playlist;
