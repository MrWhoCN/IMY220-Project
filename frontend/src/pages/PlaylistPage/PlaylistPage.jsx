import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/SidebarComponent/Sidebar';
import Playlist from '../../components/PlayListComponent/Playlist';
import './css/PlaylistPage.css';
import Cookies from "js-cookie";

const PlaylistPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { playlistId } = useParams();  // 确保从 URL 参数中获取 playlistId
    const userId = Cookies.get('userId'); // Get userId from cookies

    // Fetch playlists when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`/playlists?userId=${userId}`)
                .then((response) => response.json())
                .then((data) => setPlaylists(data))
                .catch((error) => console.error('Error fetching playlists:', error));
        }
    }, [userId]);
    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="playlistPage">
            <Sidebar playlists={playlists} setPlaylists={setPlaylists} />
            <main className="mainContent">
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="searchInput"
                    />
                </div>
                {/* 传递 playlistId 到 Playlist 组件 */}
                <Playlist searchQuery={searchQuery} playlistId={playlistId} />
            </main>
        </div>
    );
};

export default PlaylistPage;
