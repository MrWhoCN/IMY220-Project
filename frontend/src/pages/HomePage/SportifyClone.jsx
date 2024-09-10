import React, { useState } from 'react';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import PlaylistSection from '../../components/HomePageComponent/PlaylistSection';
import SearchBar from '../../components/HomePageComponent/SearchBar';
import './css/SpotifyClone.css';

const combinedPlaylists = [
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37a90d50dc2c11f00aaaa4d08e32dcdeb27eab659834e00765a2e49a7eaf1fc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Peaceful Piano', description: 'Peaceful piano to help you slow down, breathe, and...' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2353c39dab6b6ce0b9be888d571a048e4045a1c494090f3a7b0ccde9919c566d?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Deep Focus', description: 'Keep calm and focus with ambient and post-rock music.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/af939b30c5a67ddbe318aa4121e078b94748f84fe618070f72969cf5fd0f5080?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Instrumental Study', description: 'Focus with soft study music in the background.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e3ea056c2f02db73711ffb2537224ca6166a758a71711b5466289573dd681f01?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Focus Flow', description: 'Uptempo instrumental hip hop beats.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a35192b268e8b78731b479771596808a83857cff3325e964cd669a9403f27bc2?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Beats to think to', description: 'Focus with deep techno and tech house.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cd0a157bd2b5ea2f1489fca14e5378eb7bff78f7a94518a56a5410f4931fae74?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: "Today's Top Hits", description: 'Harry Styles is on top of the Hottest 50!' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f3d5880ed4318f9a7a26e959f4fdc0e75c257ffff6b37b02aa19b8221029858d?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'RapCaviar', description: 'New music from Lil Baby, Gucci Mane and DaBaby.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/84a9e947d297d78841fc56a2bf61b10d8c5268bf5051fd11434c40322cdeb4d6?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'All Out 2010s', description: 'The biggest songs of the 2010s.' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15abae4a3de88fd394051bdbebc8328c807f8f5969a611088b6253db13641f4f?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Rock Classics', description: 'Rock legends & epic songs that continue to inspire...' },
    { image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7bcaa43a53580be109b30e697b7c44a56f1e8c9de47261cb7630ba92c1a39a73?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346', title: 'Chill Hits', description: 'Kick back to the best new and recent chill hits.' },
];


function SpotifyClone() {
    const [playlists, setPlaylists] = useState(combinedPlaylists);
    const [filteredPlaylists, setFilteredPlaylists] = useState(combinedPlaylists);

    const handleSearch = (query) => {
        const filtered = combinedPlaylists.filter(playlist =>
            playlist.title.toLowerCase().includes(query.toLowerCase()) ||
            playlist.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPlaylists(filtered);
    };

    const addSongToPlaylist = (playlistName, song) => {
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.title === playlistName) {
                return { ...playlist, songs: [...playlist.songs, song] };
            }
            return playlist;
        });
        setPlaylists(updatedPlaylists);
    };

    return (
        <div className="container">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} addSongToPlaylist={addSongToPlaylist} />
            <main className="mainContent">
                <SearchBar onSearch={handleSearch} />
                <PlaylistSection title="Suggestion & Top Hits" subtitle="Focus & Top Charts" playlists={filteredPlaylists} />
            </main>
        </div>
    );
}

export default SpotifyClone;