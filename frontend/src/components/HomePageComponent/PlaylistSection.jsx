import React from 'react';
import PlaylistCard from './PlaylistCard';

const PlaylistSection = ({ title, subtitle, playlists, onAddSong }) => (
    <section className="mb-8">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <div className="text-gray-500 text-sm">{subtitle}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
                <PlaylistCard
                    key={playlist.songId}
                    image={playlist.image}
                    title={playlist.title}
                    description={playlist.description}
                    songId={playlist.songId}
                    onAddSong={onAddSong}
                />
            ))}
        </div>
    </section>
);

export default PlaylistSection;
