import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import PlaylistSection from '../../components/HomePageComponent/PlaylistSection';

function SpotifyClone() {
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('/songs');
                const data = await response.json();
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

        fetchSongs().then(r => console.log('Songs fetched:', r));
    }, []);


    // 添加处理添加歌曲到播放列表的逻辑
    const handleAddSongClick = (songId) => {
        console.log('Song ID selected to add:', songId);
        // 处理添加歌曲到播放列表的逻辑
    };

    return (
        <div className="flex">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />
            <main className="flex-1 p-6 bg-gray-100">
                <PlaylistSection
                    title="Suggestion & Top Hits"
                    subtitle="Focus & Top Charts"
                    playlists={filteredPlaylists}
                    onAddSong={handleAddSongClick}
                />
            </main>
        </div>
    );
}
export default SpotifyClone;
