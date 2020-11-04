'use strict';

// import des module Utiles
const express = require('express');
const alasql = require('alasql');
const bodyParser = require('body-parser');

// import des modules
const UserController = require('./controllers/userController.js');
const MessageController = require('./controllers/messageController.js');
const testController = require('./controllers/testController.js');

// export de notre application vers le serveur principal
module.exports = () => {

    // création d'une app express
    const app = express();

    // création de la base de données
    alasql(`
        -- Création de la BD
        create filestorage database if not exists mydb("./api/data/database.json");
        attach filestorage database mydb("./api/data/database.json");
        use mydb;
        -- Création des tables
        create table if not exists User(id INT PRIMARY KEY, name VARCHAR(32));
        create table if not exists Room(id INT PRIMARY KEY, name VARCHAR(32));
        create table if not exists Message(id INT PRIMARY KEY, sender INT, room INT, time INT, content VARCHAR(2048));
    `);

    app.use(bodyParser.json());

    testController(app);

    app.get('/message/', JsonGet((req) => MessageController.getMessages()));
    app.get('/room/:idRoom/messages/', JsonGet((req) => MessageController.getRoomMessages(req.params['idRoom'])));
    app.get('/message/:idMessage', JsonGet((req) => MessageController.getMessage(req.params['idMessage'])));
    app.post('/message/', (req, res) => MessageController.addMessage(req.body));
    app.get('/user/', JsonGet((req) => UserController.getUsers()));
    app.get('/user/:idUser', JsonGet((req) => UserController.getUser(req.params['idUser'])));
    app.get('/user/name/:idUser', JsonGet((req) => UserController.getUserName(req.params['idUser'])));
    app.post('/user/', (req, res) => UserController.addUser(req.body));

    function JsonGet(callback) {
        return function(req, res) {
            res.set({
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            });
            res.send(JSON.stringify(callback(req)));
        };
    }

    return app;
}
