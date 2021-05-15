'use strict';

const fs = require('fs');
const express = require('express');
let app = express();

// pages
app.use('/', express.static('client'));
app.use('/chat', express.static('client/chat.html'));
app.use('/forum', express.static('client/forum.html'));
app.use('/forum/topic/:id/', express.static('client/forum-topic.html'));
app.use('/file', listFiles);

// api
const api = require('./api/api.js');
app.use('/api', api());

//app.listen({host: "localhost", port: 3000});
app.listen({host: "192.168.1.12", port: 80});

function listFiles(req, res) {
	fs.readdir('client/file', (err, files) => {
		if (err) {
			throw err;
		}
		
		let htmlList = ""
		files.forEach(file => {
			htmlList += '<li><a href="'+file+'">'+file+'</a></li>'
		});
		
		res.set({
			'Content-Type': 'text/html',
			'charset': 'utf-8'
		});
		res.send('<ul>'+htmlList+'</ul>');
	});
}
