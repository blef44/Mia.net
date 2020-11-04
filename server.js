'use strict';

const express = require('express');
let app = express();

// pages
app.use('/', express.static('client'));
app.use('/chat', express.static('client/chat.html'));

// api
const api = require('./api/api.js');
app.use('/api', api());

app.listen({host: "localhost", port: 3000});
