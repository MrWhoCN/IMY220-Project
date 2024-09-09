import React from 'react';
import PlaylistHeader from './PlaylistHeader';
import PlaylistItem from './PlaylistItem';
import './Playlist.css';

const initialPlaylistData = [
    { number: 1, title: "So Far So Good", albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", artist: "Sun Of They", album: "Silent Hills", dateAdded: "1 week ago", duration: "2:31" },
    { number: 2, title: "Another Day", albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", artist: "Artist X", album: "Dreamscape", dateAdded: "2 weeks ago", duration: "3:45" },
    { number: 3, title: "Lost in Time", albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", artist: "Unknown Artist", album: "Infinity", dateAdded: "3 days ago", duration: "4:12" },
    { number: 4, title: "Journey", albumCover: "https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346", artist: "Sun Of They", album: "Silent Hills", dateAdded: "1 week ago", duration: "2:31" },
];

const Playlist = ({ searchQuery }) => {
    // Filter the playlist based on the search query
    const filteredPlaylistData = initialPlaylistData.filter(
        (song) =>
            song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="playlistSection">
            <PlaylistHeader />
            <div className="playlistItems">
                {filteredPlaylistData.length > 0 ? (
                    filteredPlaylistData.map((item, index) => (
                        <PlaylistItem key={index} {...item} />
                    ))
                ) : (
                    <div>No songs match your search.</div>
                )}
            </div>
        </section>
    );
};

export default Playlist;