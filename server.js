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

	/*Link Files*/
// Load the main page
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Load socket.io
app.get('/socket.io/socket.io.js', function (req, res) {
  res.sendfile(__dirname + '/socket.io/socket.io.js');
});

	/*Initialize Game datas*/
var okMessage = "Welcome fellow.";

	/*On Player Connection*/
io.sockets.on('connection', function (socket) {
	socket.on('greeting_server_event', function (message) {
		message = ent.encode(message);
		console.log(("A player is greeting me: ".info)+(message.data));
	});
	socket.emit('server_greeting_you_event', okMessage);
});

console.log("Starting the server...".info);
server.listen(8080);

