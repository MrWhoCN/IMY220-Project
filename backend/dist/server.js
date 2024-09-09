"use strict";

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

// Serve static files from the frontend/public directory
app.use(express["static"](path.join(__dirname, '../../frontend/public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});