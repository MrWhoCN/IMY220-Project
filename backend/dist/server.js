"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

// Initialize Express and set the port
var app = express();
var port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb+srv://u18234039:770892566a@imy220.6zafl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Connected to MongoDB");
})["catch"](function (err) {
  return console.error("Could not connect to MongoDB", err);
});

// Serve static files from the frontend/public directory
app.use(express["static"](path.join(__dirname, '../../frontend/public')));

// User schema
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
});

// Playlist schema
var playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
});

// Song schema
var songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  albumCover: String,
  artist: String,
  album: String,
  dateAdded: String,
  duration: String
});

// Comment schema
var commentSchema = new mongoose.Schema({
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model('User', userSchema);
var Playlist = mongoose.model('Playlist', playlistSchema);
var Song = mongoose.model('Song', songSchema);
var Comment = mongoose.model('Comment', commentSchema);

// Authentication API Requests (Login, Signup, Logout)
app.post('/signup', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, email, password, existingUser, salt, passwordHash, newUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          if (!(!username || !email || !password)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).send('All fields are required.'));
        case 3:
          _context.next = 5;
          return User.findOne({
            email: email
          });
        case 5:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).send('User already exists.'));
        case 8:
          _context.next = 10;
          return bcrypt.genSalt(10);
        case 10:
          salt = _context.sent;
          _context.next = 13;
          return bcrypt.hash(password, salt);
        case 13:
          passwordHash = _context.sent;
          newUser = new User({
            username: username,
            email: email,
            passwordHash: passwordHash,
            followers: [],
            following: [],
            playlists: []
          });
          _context.prev = 15;
          _context.next = 18;
          return newUser.save();
        case 18:
          res.status(201).send('User registered successfully.');
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](15);
          res.status(500).send('Error registering user.');
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[15, 21]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/login', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, user, validPassword;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).send('All fields are required.'));
        case 3:
          _context2.next = 5;
          return User.findOne({
            email: email
          }).populate('followers', 'username').populate('following', 'username').populate('playlists', 'name');
        case 5:
          user = _context2.sent;
          if (user) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(404).send('User not found.'));
        case 8:
          _context2.next = 10;
          return bcrypt.compare(password, user.passwordHash);
        case 10:
          validPassword = _context2.sent;
          if (validPassword) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.status(401).send('Invalid password.'));
        case 13:
          res.status(200).json(user); // This sends back the user object, including the user ID
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Since we're not using sessions or tokens, logout can be handled client-side by deleting stored credentials.

// Profile API Requests (View, Edit, View someone else's, Delete your profile)
app.get('/users/:userId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.params.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return User.findById(userId).populate('followers', 'username').populate('following', 'username').populate('playlists', 'name');
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).send('User not found.'));
        case 7:
          res.status(200).json(user);
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).send('Error fetching user profile.');
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//display all users
app.get('/users', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return User.find().populate('followers', 'username').populate('following', 'username').populate({
            path: 'playlists',
            select: 'name image' // Select only necessary fields
          });
        case 3:
          users = _context4.sent;
          res.status(200).json(users);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send('Error fetching users.');
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.put('/users/:userId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, _req$body3, username, email, password, user, salt;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.userId;
          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, password = _req$body3.password;
          _context5.prev = 2;
          _context5.next = 5;
          return User.findById(userId);
        case 5:
          user = _context5.sent;
          if (user) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).send('User not found.'));
        case 8:
          // Update fields if they are provided
          if (username) user.username = username;
          if (email) user.email = email;
          if (!password) {
            _context5.next = 17;
            break;
          }
          _context5.next = 13;
          return bcrypt.genSalt(10);
        case 13:
          salt = _context5.sent;
          _context5.next = 16;
          return bcrypt.hash(password, salt);
        case 16:
          user.passwordHash = _context5.sent;
        case 17:
          user.updatedAt = Date.now();
          _context5.next = 20;
          return user.save();
        case 20:
          res.status(200).json(user);
          _context5.next = 26;
          break;
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](2);
          res.status(500).send('Error updating user profile.');
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 23]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app["delete"]('/users/:userId', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.userId;
          _context6.prev = 1;
          _context6.next = 4;
          return User.findByIdAndDelete(userId);
        case 4:
          res.status(200).send('User deleted successfully.');
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          res.status(500).send('Error deleting user profile.');
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

// Fetch a user's playlists
app.get('/users/:userId/playlists', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userId, playlists;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.params.userId;
          _context7.prev = 1;
          _context7.next = 4;
          return Playlist.find({
            userId: userId
          }).populate('songs');
        case 4:
          playlists = _context7.sent;
          res.status(200).json(playlists);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          res.status(500).send('Error fetching user playlists.');
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

//logout API
app.post('/logout', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          res.status(200).send('Logged out successfully.');
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

// Friend / Unfriend API Requests
app.post('/users/:userId/follow', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userId, followerId, userToFollow, follower;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          userId = req.params.userId;
          followerId = req.body.followerId;
          _context9.prev = 2;
          _context9.next = 5;
          return User.findById(userId);
        case 5:
          userToFollow = _context9.sent;
          _context9.next = 8;
          return User.findById(followerId);
        case 8:
          follower = _context9.sent;
          if (!(!userToFollow || !follower)) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(404).send('User not found.'));
        case 11:
          if (!userToFollow.followers.includes(followerId)) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", res.status(400).send('Already following this user.'));
        case 13:
          userToFollow.followers.push(followerId);
          follower.following.push(userId);
          _context9.next = 17;
          return userToFollow.save();
        case 17:
          _context9.next = 19;
          return follower.save();
        case 19:
          res.status(200).send('User followed successfully.');
          _context9.next = 25;
          break;
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](2);
          res.status(500).send('Error following user.');
        case 25:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 22]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.post('/users/:userId/unfollow', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var userId, followerId, userToUnfollow, follower, followerIndex, followingIndex;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.params.userId;
          followerId = req.body.followerId;
          _context10.prev = 2;
          _context10.next = 5;
          return User.findById(userId);
        case 5:
          userToUnfollow = _context10.sent;
          _context10.next = 8;
          return User.findById(followerId);
        case 8:
          follower = _context10.sent;
          if (!(!userToUnfollow || !follower)) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return", res.status(404).send('User not found.'));
        case 11:
          followerIndex = userToUnfollow.followers.indexOf(followerId);
          followingIndex = follower.following.indexOf(userId);
          if (!(followerIndex === -1 || followingIndex === -1)) {
            _context10.next = 15;
            break;
          }
          return _context10.abrupt("return", res.status(400).send('Not following this user.'));
        case 15:
          userToUnfollow.followers.splice(followerIndex, 1);
          follower.following.splice(followingIndex, 1);
          _context10.next = 19;
          return userToUnfollow.save();
        case 19:
          _context10.next = 21;
          return follower.save();
        case 21:
          res.status(200).send('User unfollowed successfully.');
          _context10.next = 27;
          break;
        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10["catch"](2);
          res.status(500).send('Error unfollowing user.');
        case 27:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[2, 24]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

// Your Playlist API Requests (Create, Add songs, View, Edit, Delete)
app.post('/playlists', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body4, name, description, userId, user, newPlaylist;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$body4 = req.body, name = _req$body4.name, description = _req$body4.description, userId = _req$body4.userId; // Input validation
          if (!(!name || !userId)) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", res.status(400).send('Name and userId are required.'));
        case 3:
          _context11.prev = 3;
          _context11.next = 6;
          return User.findById(userId);
        case 6:
          user = _context11.sent;
          if (user) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(404).send('User not found.'));
        case 9:
          // Create new playlist
          newPlaylist = new Playlist({
            name: name,
            description: description,
            userId: userId,
            songs: [],
            comments: []
          }); // Save playlist to database
          _context11.next = 12;
          return newPlaylist.save();
        case 12:
          // Add the playlist to the user's playlists array
          user.playlists.push(newPlaylist._id);
          _context11.next = 15;
          return user.save();
        case 15:
          // Respond with the created playlist
          res.status(201).json(newPlaylist);
          _context11.next = 21;
          break;
        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](3);
          res.status(500).send('Error creating playlist.');
        case 21:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 18]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.get('/playlists/:playlistId', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var playlistId, playlist;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          playlistId = req.params.playlistId;
          _context12.prev = 1;
          _context12.next = 4;
          return Playlist.findById(playlistId).populate('userId', 'username').populate('songs').populate({
            path: 'comments',
            populate: {
              path: 'userId',
              select: 'username'
            }
          });
        case 4:
          playlist = _context12.sent;
          if (playlist) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).send('Playlist not found.'));
        case 7:
          res.status(200).json(playlist);
          _context12.next = 13;
          break;
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](1);
          res.status(500).send('Error fetching playlist.');
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 10]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.put('/playlists/:playlistId', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var playlistId, _req$body5, name, description, playlist;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          playlistId = req.params.playlistId;
          _req$body5 = req.body, name = _req$body5.name, description = _req$body5.description;
          _context13.prev = 2;
          _context13.next = 5;
          return Playlist.findById(playlistId);
        case 5:
          playlist = _context13.sent;
          if (playlist) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", res.status(404).send('Playlist not found.'));
        case 8:
          if (name) playlist.name = name;
          if (description) playlist.description = description;
          playlist.updatedAt = Date.now();
          _context13.next = 13;
          return playlist.save();
        case 13:
          res.status(200).json(playlist);
          _context13.next = 19;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](2);
          res.status(500).send('Error updating playlist.');
        case 19:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[2, 16]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
app["delete"]('/playlists/:playlistId', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var playlistId, userId, playlist, user, playlistIndex;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          playlistId = req.params.playlistId;
          userId = req.body.userId; // Assume that userId is sent in the request body
          _context14.prev = 2;
          _context14.next = 5;
          return Playlist.findById(playlistId);
        case 5:
          playlist = _context14.sent;
          if (playlist) {
            _context14.next = 8;
            break;
          }
          return _context14.abrupt("return", res.status(404).send('Playlist not found.'));
        case 8:
          if (!(playlist.userId.toString() !== userId)) {
            _context14.next = 10;
            break;
          }
          return _context14.abrupt("return", res.status(403).send('You are not authorized to delete this playlist.'));
        case 10:
          _context14.next = 12;
          return User.findById(userId);
        case 12:
          user = _context14.sent;
          playlistIndex = user.playlists.indexOf(playlistId);
          if (!(playlistIndex !== -1)) {
            _context14.next = 18;
            break;
          }
          user.playlists.splice(playlistIndex, 1);
          _context14.next = 18;
          return user.save();
        case 18:
          _context14.next = 20;
          return Playlist.findByIdAndDelete(playlistId);
        case 20:
          res.status(200).send('Playlist deleted successfully.');
          _context14.next = 26;
          break;
        case 23:
          _context14.prev = 23;
          _context14.t0 = _context14["catch"](2);
          res.status(500).send('Error deleting playlist.');
        case 26:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[2, 23]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app.post('/playlists/:playlistId/songs', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var playlistId, songId, playlist, song;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          playlistId = req.params.playlistId;
          songId = req.body.songId;
          console.log('Received songId:', songId); // Debug log
          if (songId) {
            _context15.next = 5;
            break;
          }
          return _context15.abrupt("return", res.status(400).send('Song ID is required.'));
        case 5:
          _context15.prev = 5;
          _context15.next = 8;
          return Playlist.findById(playlistId);
        case 8:
          playlist = _context15.sent;
          if (playlist) {
            _context15.next = 11;
            break;
          }
          return _context15.abrupt("return", res.status(404).send('Playlist not found.'));
        case 11:
          _context15.next = 13;
          return Song.findById(songId);
        case 13:
          song = _context15.sent;
          if (song) {
            _context15.next = 16;
            break;
          }
          return _context15.abrupt("return", res.status(404).send('Song not found.'));
        case 16:
          playlist.songs.push(song._id);
          _context15.next = 19;
          return playlist.save();
        case 19:
          res.status(200).json({
            message: 'Song added to playlist successfully.',
            playlist: playlist
          });
          _context15.next = 26;
          break;
        case 22:
          _context15.prev = 22;
          _context15.t0 = _context15["catch"](5);
          console.error('Error adding song:', _context15.t0); // Error log
          res.status(500).send('Error adding song to playlist.');
        case 26:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[5, 22]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());

// Songs API Requests (Create song, Delete song)
app.post('/songs', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$body6, title, albumCover, artist, album, dateAdded, duration, newSong;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _req$body6 = req.body, title = _req$body6.title, albumCover = _req$body6.albumCover, artist = _req$body6.artist, album = _req$body6.album, dateAdded = _req$body6.dateAdded, duration = _req$body6.duration;
          if (!(!title || !artist)) {
            _context16.next = 3;
            break;
          }
          return _context16.abrupt("return", res.status(400).send('Title and artist are required.'));
        case 3:
          _context16.prev = 3;
          newSong = new Song({
            title: title,
            albumCover: albumCover,
            artist: artist,
            album: album,
            dateAdded: dateAdded,
            duration: duration
          });
          _context16.next = 7;
          return newSong.save();
        case 7:
          res.status(201).json(newSong);
          _context16.next = 13;
          break;
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](3);
          res.status(500).send('Error creating song.');
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[3, 10]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app["delete"]('/songs/:songId', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var songId;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          songId = req.params.songId;
          _context17.prev = 1;
          _context17.next = 4;
          return Playlist.updateMany({
            songs: songId
          }, {
            $pull: {
              songs: songId
            }
          });
        case 4:
          _context17.next = 6;
          return Song.findByIdAndDelete(songId);
        case 6:
          res.status(200).send('Song deleted successfully.');
          _context17.next = 12;
          break;
        case 9:
          _context17.prev = 9;
          _context17.t0 = _context17["catch"](1);
          res.status(500).send('Error deleting song.');
        case 12:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[1, 9]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());

// Search songs
app.get('/songs/search', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var title, songs;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          title = req.query.title;
          _context18.prev = 1;
          _context18.next = 4;
          return Song.find({
            title: {
              $regex: title,
              $options: 'i'
            }
          });
        case 4:
          songs = _context18.sent;
          res.status(200).json(songs);
          _context18.next = 11;
          break;
        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](1);
          res.status(500).json({
            error: 'Error searching songs.'
          });
        case 11:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[1, 8]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());

// Search users
app.get('/users/search', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var username, users;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          username = req.query.username;
          _context19.prev = 1;
          _context19.next = 4;
          return User.find({
            username: {
              $regex: username,
              $options: 'i'
            }
          }).select('username email playlists').populate({
            path: 'playlists',
            select: 'name image'
          });
        case 4:
          users = _context19.sent;
          res.status(200).json(users);
          _context19.next = 11;
          break;
        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](1);
          res.status(500).json({
            error: 'Error searching users.'
          });
        case 11:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1, 8]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app.get('/playlists', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var searchQuery, playlists;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          searchQuery = req.query.search;
          _context20.prev = 1;
          _context20.next = 4;
          return Playlist.find(searchQuery ? {
            name: {
              $regex: searchQuery,
              $options: 'i'
            }
          } : {}).populate('userId', 'username') // Populate creator's username
          .populate('songs').populate('comments');
        case 4:
          playlists = _context20.sent;
          res.status(200).json(playlists);
          _context20.next = 11;
          break;
        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          res.status(500).json({
            error: 'Error fetching playlists.'
          });
        case 11:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1, 8]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
app.get('/playlists/:playlistId/songs', /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var playlistId, playlist;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          playlistId = req.params.playlistId;
          console.log('Fetching songs for playlistId:', playlistId);
          _context21.prev = 2;
          _context21.next = 5;
          return Playlist.findById(playlistId).populate('songs');
        case 5:
          playlist = _context21.sent;
          if (playlist) {
            _context21.next = 8;
            break;
          }
          return _context21.abrupt("return", res.status(404).send('Playlist not found.'));
        case 8:
          res.status(200).json(playlist.songs);
          _context21.next = 15;
          break;
        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](2);
          console.error('Error fetching songs:', _context21.t0);
          res.status(500).send('Error fetching songs.');
        case 15:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[2, 11]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
app["delete"]('/playlists/:playlistId/songs/:songId', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var _req$params, playlistId, songId, playlist, songIndex;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _req$params = req.params, playlistId = _req$params.playlistId, songId = _req$params.songId;
          _context22.prev = 1;
          _context22.next = 4;
          return Playlist.findById(playlistId);
        case 4:
          playlist = _context22.sent;
          if (playlist) {
            _context22.next = 7;
            break;
          }
          return _context22.abrupt("return", res.status(404).send('Playlist not found.'));
        case 7:
          songIndex = playlist.songs.indexOf(songId);
          if (!(songIndex === -1)) {
            _context22.next = 10;
            break;
          }
          return _context22.abrupt("return", res.status(404).send('Song not found in playlist.'));
        case 10:
          playlist.songs.splice(songIndex, 1);
          _context22.next = 13;
          return playlist.save();
        case 13:
          res.status(200).send('Song deleted successfully.');
          _context22.next = 19;
          break;
        case 16:
          _context22.prev = 16;
          _context22.t0 = _context22["catch"](1);
          res.status(500).send('Error deleting song.');
        case 19:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[1, 16]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
app.get('/playlists/:playlistId/comments', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var playlistId, comments;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          playlistId = req.params.playlistId;
          _context23.prev = 1;
          _context23.next = 4;
          return Comment.find({
            playlistId: playlistId
          }).populate('userId', 'username');
        case 4:
          comments = _context23.sent;
          res.status(200).json(comments);
          _context23.next = 11;
          break;
        case 8:
          _context23.prev = 8;
          _context23.t0 = _context23["catch"](1);
          res.status(500).send('Error fetching comments.');
        case 11:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[1, 8]]);
  }));
  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());
app.post('/playlists/:playlistId/comments', /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var playlistId, _req$body7, userId, content, comment, playlist;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          playlistId = req.params.playlistId;
          _req$body7 = req.body, userId = _req$body7.userId, content = _req$body7.content; // Input validation
          if (!(!userId || !content)) {
            _context24.next = 4;
            break;
          }
          return _context24.abrupt("return", res.status(400).send('User ID and content are required.'));
        case 4:
          _context24.prev = 4;
          comment = new Comment({
            playlistId: playlistId,
            userId: userId,
            content: content
          }); // Save the comment
          _context24.next = 8;
          return comment.save();
        case 8:
          _context24.next = 10;
          return Playlist.findById(playlistId);
        case 10:
          playlist = _context24.sent;
          if (playlist) {
            _context24.next = 13;
            break;
          }
          return _context24.abrupt("return", res.status(404).send('Playlist not found.'));
        case 13:
          playlist.comments.push(comment._id);
          _context24.next = 16;
          return playlist.save();
        case 16:
          res.status(201).json(comment);
          _context24.next = 22;
          break;
        case 19:
          _context24.prev = 19;
          _context24.t0 = _context24["catch"](4);
          res.status(500).send('Error adding comment.');
        case 22:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[4, 19]]);
  }));
  return function (_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}());

// Fetch songs
app.get('/songs', /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var searchQuery, songs;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          searchQuery = req.query.search; // Get the search query from the URL params
          _context25.prev = 1;
          _context25.next = 4;
          return Song.find(searchQuery ? {
            name: {
              $regex: searchQuery,
              $options: 'i'
            }
          } // Search by song name
          : {});
        case 4:
          songs = _context25.sent;
          res.status(200).json(songs);
          _context25.next = 11;
          break;
        case 8:
          _context25.prev = 8;
          _context25.t0 = _context25["catch"](1);
          res.status(500).json({
            error: 'Error fetching songs.'
          });
        case 11:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[1, 8]]);
  }));
  return function (_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}());

// Add a playlist to a user (already implemented)
app.post('/users/:userId/playlists', /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
    var userId, playlistId, user, playlist;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          userId = req.params.userId;
          playlistId = req.body.playlistId;
          _context26.prev = 2;
          _context26.next = 5;
          return User.findById(userId);
        case 5:
          user = _context26.sent;
          if (user) {
            _context26.next = 8;
            break;
          }
          return _context26.abrupt("return", res.status(404).send('User not found.'));
        case 8:
          if (user.playlists.includes(playlistId)) {
            _context26.next = 12;
            break;
          }
          user.playlists.push(playlistId);
          _context26.next = 12;
          return user.save();
        case 12:
          _context26.next = 14;
          return Playlist.findById(playlistId);
        case 14:
          playlist = _context26.sent;
          res.status(200).json(playlist); // Return the playlist
          _context26.next = 21;
          break;
        case 18:
          _context26.prev = 18;
          _context26.t0 = _context26["catch"](2);
          res.status(500).send('Error adding playlist to user.');
        case 21:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[2, 18]]);
  }));
  return function (_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}());

//fetch all songs from the database

// Serve frontend
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});