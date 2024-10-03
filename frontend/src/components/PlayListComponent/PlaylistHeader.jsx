import React from 'react';

const PlaylistHeader = () => (
    <header className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Songs</h3>
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="flex space-x-4">
                <span className="text-gray-500">#</span>
                <span className="text-gray-500">Title</span>
            </div>
            <div className="flex space-x-6 text-gray-500">
                <span>Album</span>
                <span>Date added</span>
                <span>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/66526df9bcdef2c42f8bcee05164c4b48a415acdd561b2ee64b1e60a23dd3886?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Duration icon"
                        className="w-5 h-5"
                    />
                </span>
            </div>
        </div>
    </header>
);

export default PlaylistHeader;
