const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Catch all routes and send the index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});