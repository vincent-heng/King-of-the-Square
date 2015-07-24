	/*Load Dependencies*/
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

var url = require('url');
var querystring = require('querystring');
var path = require('path');

var ent = require('ent'); // htmlentities' equivalent
var colors = require('colors');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var modulePlayer = require('./scripts/Player');

	/*Link Files*/
// Load the main page
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Load socket.io
app.get('/socket.io/socket.io.js', function (req, res) {
  res.sendfile(__dirname + '/socket.io/socket.io.js');
});

// Load css
app.get('/css/modern-business.css', function (req, res) {
  res.sendfile(__dirname + '/css/modern-business.css');
});

app.get('/scripts/app.js', function (req, res) {
  res.sendfile(__dirname + '/scripts/app.js');
});


	/*Initialize Game datas*/
var okMessage = "Welcome fellow.";

	/*On Player Connection*/
io.sockets.on('connection', function (socket) {
    var player = new modulePlayer.Player();
	socket.emit('server_player_init_event', player);
});

console.log("Starting the server...".info);
server.listen(8080);

