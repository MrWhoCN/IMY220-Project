import React from 'react';

const PlaylistItem = ({ number, albumCover, title, artist, album, dateAdded, duration, onDelete }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <span className="text-gray-500">{number}</span>
                <div className="flex items-center space-x-4">
                    <img src={albumCover} className="w-12 h-12 rounded-md" alt={title} />
                    <div>
                        <span className="block font-medium text-gray-900">{title}</span>
                        <span className="block text-sm text-gray-500">{artist}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <span className="text-gray-500">{album}</span>
                <span className="text-gray-500">{dateAdded}</span>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500">{duration}</span>
                    {/* Delete button */}
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistItem;
