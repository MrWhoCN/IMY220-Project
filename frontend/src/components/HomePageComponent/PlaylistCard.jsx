import React, { useEffect, useState } from 'react';
import '../../pages/HomePage/css/SpotifyClone.css';
import Modal from 'react-modal';
import Cookies from "js-cookie";

const PlaylistCard = ({ image, title, description, songId }) => {
    const [playlists, setPlaylists] = useState([]);
    const [showPlaylists, setShowPlaylists] = useState(false);  // 控制是否显示播放列表
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);  // 控制 Modal 显示

    // Fetch 用户的播放列表
    useEffect(() => {
        fetch('/playlists')
            .then((response) => response.json())
            .then((data) => setPlaylists(data))
            .catch((error) => console.error('Error fetching playlists:', error));
    }, []);

    // 点击 "Add" 按钮，显示可选播放列表
    const handleAddClick = () => {
        if (playlists.length > 0) {
            setShowPlaylists(true);  // 打开播放列表选择
            setModalOpen(true);  // 打开 Modal
        } else {
            setMessage('No playlists available. Please create a playlist first.');
        }
    };

    // 添加歌曲到选定的播放列表
    const handleAddSongToPlaylist = async (playlistId) => {
        console.log('Adding songId:', songId);  // 打印 songId，确保它不是 undefined
        const userId = Cookies.get('userId');
        if (!userId) {
            setMessage('User ID not found in cookies.');
            return;
        }

        try {
            const response = await fetch(`/playlists/${playlistId}/songs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ songId })  // 传递 songId
            });

            if (response.ok) {
                setMessage(`"${title}" added to your playlist.`);
            } else if (response.status === 400) {
                setMessage('Song ID is required.');
            } else {
                throw new Error('Failed to add song to playlist.');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            setMessage('Failed to add song.');
        }
        setModalOpen(false);  // 添加后关闭 modal
    };

    return (
        <div className="playlistCard">
            <img loading="lazy" src={image} alt={title} className="playlistImage" />
            <div className="playlistInfo">
                <div className="playlistTitles">{title}</div>
                <div className="playlistDescription">{description}</div>
            </div>
            <button className="addButton" onClick={handleAddClick}>Add</button>
            {message && <div className="message">{message}</div>}

            {/* 显示选择播放列表的 Modal */}
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}  // 允许点击外部关闭 Modal
                    contentLabel="Select a Playlist"
                >
                    <h2>Select a Playlist</h2>
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <button key={playlist._id} onClick={() => handleAddSongToPlaylist(playlist._id)}>
                                {playlist.name}
                            </button>
                        ))
                    ) : (
                        <p>No playlists available</p>
                    )}
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default PlaylistCard;
