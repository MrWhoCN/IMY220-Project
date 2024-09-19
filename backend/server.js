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
    followers: [mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId],
    playlists: [mongoose.Schema.Types.ObjectId],
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

//login
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



app.get('/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('userId', 'username').populate('songs').populate('comments');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching playlists.' });
    }
});

//search a playlist from the database through the name
app.get('/playlists/search', async (req, res) => {
    const { name } = req.query;

    try {
        const playlists = await Playlist.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching playlists.' });
    }
});


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

app.get('/playlists/:playlistId/songs', async (req, res) => {
    const { playlistId } = req.params;

    // 打印 playlistId 确认
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

//delete song from playlist
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

//fetch songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching songs.' });
    }
});

// Add a song to a playlist
app.post('/playlists/:playlistId/songs', async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    console.log('Received songId:', songId); // 调试日志

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
        console.error('Error adding song:', error); // 捕获错误信息
        res.status(500).send('Error adding song to playlist.');
    }
});

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
        res.status(200).json(playlist);  // 返回更新后的播放列表
    } catch (error) {
        res.status(500).send('Error adding playlist to user.');
    }
});





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
