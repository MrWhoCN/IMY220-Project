const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Initialize Express and set the port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb+srv://u18234039:770892566a@imy220.6zafl.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Playlist schema
const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Song schema
const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    albumCover: String,
    artist: String,
    album: String,
    dateAdded: String,
    duration: String
});

// Comment schema
const commentSchema = new mongoose.Schema({
    playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);
const Playlist = mongoose.model('Playlist', playlistSchema);
const Song = mongoose.model('Song', songSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Authentication API Requests (Login, Signup, Logout)
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        passwordHash,
        followers: [],
        following: [],
        playlists: []
    });

    try {
        await newUser.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required.');
    }

    const user = await User
        .findOne({ email })
        .populate('followers', 'username')
        .populate('following', 'username')
        .populate('playlists', 'name');

    if (!user) {
        return res.status(404).send('User not found.');
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        return res.status(401).send('Invalid password.');
    }

    res.status(200).json(user); // This sends back the user object, including the user ID
});

// Since we're not using sessions or tokens, logout can be handled client-side by deleting stored credentials.

// Profile API Requests (View, Edit, View someone else's, Delete your profile)
app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
            .populate('followers', 'username')
            .populate('following', 'username')
            .populate('playlists', 'name');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error fetching user profile.');
    }
});

//display all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .populate('followers', 'username')
            .populate('following', 'username')
            .populate({
                path: 'playlists',
                select: 'name image', // Select only necessary fields
            });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users.');
    }
});
app.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Update fields if they are provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(password, salt);
        }

        user.updatedAt = Date.now();

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error updating user profile.');
    }
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send('User deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting user profile.');
    }
});

// Fetch a user's playlists
app.get('/users/:userId/playlists', async (req, res) => {
    const { userId } = req.params;

    try {
        const playlists = await Playlist.find({ userId }).populate('songs');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).send('Error fetching user playlists.');
    }
});

//logout API
app.post('/logout', async (req, res) => {
    res.status(200).send('Logged out successfully.');
});

// Friend / Unfriend API Requests
app.post('/users/:userId/follow', async (req, res) => {
    const { userId } = req.params;
    const { followerId } = req.body;

    try {
        const userToFollow = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!userToFollow || !follower) {
            return res.status(404).send('User not found.');
        }

        if (userToFollow.followers.includes(followerId)) {
            return res.status(400).send('Already following this user.');
        }

        userToFollow.followers.push(followerId);
        follower.following.push(userId);

        await userToFollow.save();
        await follower.save();

        res.status(200).send('User followed successfully.');
    } catch (error) {
        res.status(500).send('Error following user.');
    }
});

app.post('/users/:userId/unfollow', async (req, res) => {
    const { userId } = req.params;
    const { followerId } = req.body;

    try {
        const userToUnfollow = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!userToUnfollow || !follower) {
            return res.status(404).send('User not found.');
        }

        const followerIndex = userToUnfollow.followers.indexOf(followerId);
        const followingIndex = follower.following.indexOf(userId);

        if (followerIndex === -1 || followingIndex === -1) {
            return res.status(400).send('Not following this user.');
        }

        userToUnfollow.followers.splice(followerIndex, 1);
        follower.following.splice(followingIndex, 1);

        await userToUnfollow.save();
        await follower.save();

        res.status(200).send('User unfollowed successfully.');
    } catch (error) {
        res.status(500).send('Error unfollowing user.');
    }
});

// Your Playlist API Requests (Create, Add songs, View, Edit, Delete)
app.post('/playlists', async (req, res) => {
    const { name, description, userId } = req.body;

    // Input validation
    if (!name || !userId) {
        return res.status(400).send('Name and userId are required.');
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Create new playlist
        const newPlaylist = new Playlist({
            name,
            description,
            userId,
            songs: [],
            comments: []
        });

        // Save playlist to database
        await newPlaylist.save();

        // Add the playlist to the user's playlists array
        user.playlists.push(newPlaylist._id);
        await user.save();

        // Respond with the created playlist
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).send('Error creating playlist.');
    }
});

app.get('/playlists/:playlistId', async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId)
            .populate('userId', 'username')
            .populate('songs')
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' }
            });

        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).send('Error fetching playlist.');
    }
});

app.put('/playlists/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        if (name) playlist.name = name;
        if (description) playlist.description = description;

        playlist.updatedAt = Date.now();

        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).send('Error updating playlist.');
    }
});

app.delete('/playlists/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const { userId } = req.body; // Assume that userId is sent in the request body

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        // Check if the user is the owner of the playlist
        if (playlist.userId.toString() !== userId) {
            return res.status(403).send('You are not authorized to delete this playlist.');
        }

        // Remove playlist from user's playlists array
        const user = await User.findById(userId);
        const playlistIndex = user.playlists.indexOf(playlistId);
        if (playlistIndex !== -1) {
            user.playlists.splice(playlistIndex, 1);
            await user.save();
        }

        // Delete the playlist
        await Playlist.findByIdAndDelete(playlistId);

        res.status(200).send('Playlist deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting playlist.');
    }
});

app.post('/playlists/:playlistId/songs', async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    console.log('Received songId:', songId); // Debug log

    if (!songId) {
        return res.status(400).send('Song ID is required.');
    }

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).send('Song not found.');
        }

        playlist.songs.push(song._id);
        await playlist.save();

        res.status(200).json({ message: 'Song added to playlist successfully.', playlist });
    } catch (error) {
        console.error('Error adding song:', error); // Error log
        res.status(500).send('Error adding song to playlist.');
    }
});


// Songs API Requests (Create song, Delete song)
app.post('/songs', async (req, res) => {
    const { title, albumCover, artist, album, dateAdded, duration } = req.body;

    if (!title || !artist) {
        return res.status(400).send('Title and artist are required.');
    }

    try {
        const newSong = new Song({
            title,
            albumCover,
            artist,
            album,
            dateAdded,
            duration
        });

        await newSong.save();

        res.status(201).json(newSong);
    } catch (error) {
        res.status(500).send('Error creating song.');
    }
});

app.delete('/songs/:songId', async (req, res) => {
    const { songId } = req.params;

    try {
        // Remove song from all playlists
        await Playlist.updateMany(
            { songs: songId },
            { $pull: { songs: songId } }
        );

        // Delete the song
        await Song.findByIdAndDelete(songId);

        res.status(200).send('Song deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting song.');
    }
});


// Search songs
app.get('/songs/search', async (req, res) => {
    const { title } = req.query;

    try {
        const songs = await Song.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Error searching songs.' });
    }
});

// Search users
app.get('/users/search', async (req, res) => {
    const { username } = req.query;

    try {
        const users = await User.find({
            username: { $regex: username, $options: 'i' },
        })
            .select('username email playlists')
            .populate({
                path: 'playlists',
                select: 'name image',
            });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error searching users.' });
    }
});

app.get('/playlists', async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const playlists = await Playlist.find(
            searchQuery
                ? { name: { $regex: searchQuery, $options: 'i' } }
                : {}
        )
            .populate('userId', 'username') // Populate creator's username
            .populate('songs')
            .populate('comments');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching playlists.' });
    }
});



app.get('/playlists/:playlistId/songs', async (req, res) => {
    const { playlistId } = req.params;

    console.log('Fetching songs for playlistId:', playlistId);

    try {
        const playlist = await Playlist.findById(playlistId).populate('songs');
        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        res.status(200).json(playlist.songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send('Error fetching songs.');
    }
});

app.delete('/playlists/:playlistId/songs/:songId', async (req, res) => {
    const { playlistId, songId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }

        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            return res.status(404).send('Song not found in playlist.');
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).send('Song deleted successfully.');
    } catch (error) {
        res.status(500).send('Error deleting song.');
    }
});

app.get('/playlists/:playlistId/comments', async (req, res) => {
    const { playlistId } = req.params;

    try {
        const comments = await Comment.find({ playlistId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send('Error fetching comments.');
    }
});

app.post('/playlists/:playlistId/comments', async (req, res) => {
    const { playlistId } = req.params;
    const { userId, content } = req.body;

    // Input validation
    if (!userId || !content) {
        return res.status(400).send('User ID and content are required.');
    }

    try {
        const comment = new Comment({
            playlistId,
            userId,
            content
        });

        // Save the comment
        await comment.save();

        // Add the comment to the playlist
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).send('Playlist not found.');
        }
        playlist.comments.push(comment._id);
        await playlist.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).send('Error adding comment.');
    }
});

// Fetch songs
app.get('/songs', async (req, res) => {
    const searchQuery = req.query.search; // Get the search query from the URL params
    try {
        const songs = await Song.find(
            searchQuery
                ? { name: { $regex: searchQuery, $options: 'i' } } // Search by song name
                : {}
        );
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching songs.' });
    }
});


// Add a playlist to a user (already implemented)
app.post('/users/:userId/playlists', async (req, res) => {
    const { userId } = req.params;
    const { playlistId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (!user.playlists.includes(playlistId)) {
            user.playlists.push(playlistId);
            await user.save();
        }

        const playlist = await Playlist.findById(playlistId);
        res.status(200).json(playlist);  // Return the playlist
    } catch (error) {
        res.status(500).send('Error adding playlist to user.');
    }
});

//fetch all songs from the database

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
