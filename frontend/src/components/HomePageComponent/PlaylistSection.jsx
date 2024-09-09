import React from 'react';
import PlaylistCard from './PlaylistCard';
import '../../pages/HomePage/css/SpotifyClone.css';

const PlaylistSection = ({ title, subtitle, playlists }) => (
    <section className="sectionContainer">
        <div className="sectionHeader">
            <h2 className="sectionTitle">{title}</h2>
            <div className="sectionSubtitle">{subtitle}</div>
        </div>
        <div className="playlistGrid">
            {playlists.map((playlist, index) => (
                <PlaylistCard key={index} {...playlist} />
            ))}
        </div>
    </section>
);

export default PlaylistSection;