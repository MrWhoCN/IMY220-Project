import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpForm from "./pages/SignUpPage/SignUpForm";
import HomePage from './pages/HomePage/SportifyClone';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import ProfilePage  from "./pages/ProfilePage/ProfilePage";

const container = document.getElementById('root');
const root = createRoot(container);  // This is new in React 19

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/playlist/:playlistName" element={<PlaylistPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

root.render(<App />);