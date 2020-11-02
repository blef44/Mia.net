'use strict';

// import des module Utiles
const express = require('express');
const alasql = require('alasql');
const bodyParser = require('body-parser');

// import des modules
//import messageController from './controllers/messageController.js';
const messageController = require('./controllers/messageController.js');
const testController = require('./controllers/testController.js');

// export de notre application vers le serveur principal
module.exports = () => {

    // création d'une app express
    let app = express();

    // création de la base de données
    alasql(`
        -- Création de la BD
        create filestorage database if not exists mydb("./api/data/database.json");
        attach filestorage database mydb("./api/data/database.json");
        use mydb;
        -- Création des tables
        create table if not exists Message(id INT PRIMARY KEY, sender VARCHAR(32), time INT, content VARCHAR(2048));
    `);

    app.use(bodyParser.json());

    messageController(app);
    testController(app);
    /*app.get('/test/dropAll', function(req, res) {
        alasql(`
            drop table Message;
        `);
        res.send('La base de donnée a été vidée de ses tables');
    });
    app.get('/test/clearAll', function(req, res) {
        alasql(`
            delete from Message;
        `);
        res.send('La base de donnée a été vidée de son contenu');
    });
    app.get('/test/insertExample', function(req, res) {
        alasql(`
             -- Insertion de données exemples
            insert into Message(0, "Mia", 37, "Ceci est un message de test");
        `);
        res.send('Les données exemples ont été ajoutées');
    });

    app.get('/message/', function(req, res) {
        let tuples = alasql('select * from Message;');
        res.set({
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        });
        res.send(JSON.stringify(tuples));
    }); // liste messages
    app.get('/message/:idMessage/', templateGet('idMessage', 'Message', 'id')); // infos et contenu message

    app.post('/message/', templatePost(true, ['sender', 'time', 'content'], 'Message'));*/

    return app;
}
