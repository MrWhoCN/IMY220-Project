import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import PlaylistSection from '../../components/HomePageComponent/PlaylistSection';
import SearchBar from '../../components/HomePageComponent/SearchBar';
import './css/SpotifyClone.css';

function SpotifyClone() {
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('/songs');
                const data = await response.json();
                // Transform the fetched songs into playlist data
                const playlistData = data.map((song) => ({
                    songId: song._id,
                    image: song.albumCover,
                    title: song.title,
                    description: `${song.artist} - ${song.album}`,
                    dateAdded: song.dateAdded,
                    duration: song.duration,
                }));
                setPlaylists(playlistData);
                setFilteredPlaylists(playlistData);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleSearch = (query) => {
        const filtered = playlists.filter(playlist =>
            playlist.title.toLowerCase().includes(query.toLowerCase()) ||
            playlist.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPlaylists(filtered);
    };

    // 添加处理添加歌曲到播放列表的逻辑
    const handleAddSongClick = (songId) => {
        console.log('Song ID selected to add:', songId);
        // 处理添加歌曲到播放列表的逻辑
    };

    return (
        <div className="container">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />
            <main className="mainContent">
                <SearchBar onSearch={handleSearch} />
                <PlaylistSection
                    title="Suggestion & Top Hits"
                    subtitle="Focus & Top Charts"
                    playlists={filteredPlaylists}
                    onAddSong={handleAddSongClick} // 传递 handleAddSongClick 回调函数
                />
            </main>
        </div>
    );
}

export default SpotifyClone;
