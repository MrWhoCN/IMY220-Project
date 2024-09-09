"use strict";

var express = require('express');
var path = require('path');
var app = express();

// Serve static files from the React frontend
app.use(express["static"](path.join(__dirname, '..', 'frontend', 'public')));

// Catch all routes and send the index.html
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'public', 'index.html'));
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});