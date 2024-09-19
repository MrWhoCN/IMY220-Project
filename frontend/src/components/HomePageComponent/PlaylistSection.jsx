import React from 'react';
import PlaylistCard from './PlaylistCard';
import '../../pages/HomePage/css/SpotifyClone.css';

const PlaylistSection = ({ title, subtitle, playlists, onAddSong }) => ( // 这里解构 onAddSong
    <section className="sectionContainer">
        <div className="sectionHeader">
            <h2 className="sectionTitle">{title}</h2>
            <div className="sectionSubtitle">{subtitle}</div>
        </div>
        <div className="playlistGrid">
            {playlists.map((playlist, index) => (
                <PlaylistCard
                    key={playlist.songId} // 确保 songId 作为唯一键
                    image={playlist.image}
                    title={playlist.title}
                    description={playlist.description}
                    songId={playlist.songId} // 传递 songId
                    onAddSong={onAddSong} // 传递 onAddSong
                />
            ))}
        </div>
    </section>
);

export default PlaylistSection;
