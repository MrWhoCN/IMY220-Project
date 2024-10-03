import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cookies from "js-cookie";

const PlaylistCard = ({ image, title, description, songId }) => {
    const [playlists, setPlaylists] = useState([]);
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch user's playlists
    useEffect(() => {
        fetch('/playlists')
            .then((response) => response.json())
            .then((data) => setPlaylists(data))
            .catch((error) => console.error('Error fetching playlists:', error));
    }, []);

    const handleAddClick = () => {
        if (playlists.length > 0) {
            setShowPlaylists(true);
            setModalOpen(true);
        } else {
            setMessage('No playlists available. Please create a playlist first.');
        }
    };

    const handleAddSongToPlaylist = async (playlistId) => {
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
                body: JSON.stringify({ songId })
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
        setModalOpen(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg text-white">
            <img loading="lazy" src={image} alt={title} className="w-full h-40 object-cover rounded" />
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <button className="mt-4 bg-orange-400 hover:bg-orange-400-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddClick}>
                Add
            </button>
            {message && <div className="mt-2 text-red-500">{message}</div>}

            {/* Display Modal for selecting playlist */}
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    contentLabel="Select a Playlist"
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Select a Playlist</h2>
                        {playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <button
                                    key={playlist._id}
                                    onClick={() => handleAddSongToPlaylist(playlist._id)}
                                    className="block w-full text-left bg-amber-300 hover:bg-orange-400-300 text-gray-800 font-semibold py-2 px-4 rounded mb-2"
                                >
                                    {playlist.name}
                                </button>
                            ))
                        ) : (
                            <p>No playlists available</p>
                        )}
                        <button onClick={() => setModalOpen(false)} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PlaylistCard;
