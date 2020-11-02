'use strict';

// import des module Utiles
const express = require('express');
const alasql = require('alasql');
const bodyParser = require('body-parser');
const fs = require('fs');
//const passport = require('passport');
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

    /*`select Matiere.* from Appartient, Promo, UE, Matiere
            where Appartient.personne = `+param+` and Appartient.departement = Promo.departement
            and UE.promo = idPromo and Matiere.UE = idUE;`*/

    app.use(bodyParser.json());

    app.get('/test/dropAll', function(req, res) {
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
    app.get('/message/:idMessage/', function(req, res) {
        let idMessage = req.params['idMessage'];
        let tuples = alasql('select * from Message where id = '+idMessage+';');
        res.set({
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        });
        res.send(JSON.stringify(tuples));
    }); // infos et contenu message

    app.post('/message/', templatePost(true, ['sender', 'time', 'content'], 'Message'));

    function templateGet(paramName, table, paramInTable, isParamString, singleRow = true, columns = '*') {
        return function(req, res) {
            let param = req.params[paramName];
            if (isParamString) {
                param = '"'+param+'"';
            }

            console.log('select '+columns+' from '+table+' where '+paramInTable+' = '+param+';');
            let tuples = alasql('select '+columns+' from '+table+' where '+paramInTable+' = '+param+';');
            res.set({
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            });
            if (singleRow)
                res.send(JSON.stringify(tuples[0]));
            else
                res.send(JSON.stringify(tuples));
        };
    }

    function templatePost(autoId, parameters, table) {
        return function(req, res) {
            let allParameters = true;
            for (var p in parameters) {
                if (p in req.body)
                    allParameters = false;
            }
            if (allParameters) {
                let requete = '';
                if (autoId) {
                    // le nouvel id correspond au nombre d'annales actuel
                    let newId = alasql('select count(*) from '+table);
                    requete += newId[0]['COUNT(*)'];

                    // envoie le nouvel id crée
                    res.set({
                        'Content-Type': 'application/json',
                        'charset': 'utf-8'
                    });
                    res.send(JSON.stringify({id: newId}));
                }
                for (var i=0; i<parameters.length; i++) {
                    if (i!==0 || autoId)
                        requete += ',';
                    if (typeof(req.body[parameters[i]]) === 'string')
                        requete += '"'+req.body[parameters[i]]+'"';
                    else
                        requete += req.body[parameters[i]];
                }
                console.log('insert into '+table+'('+ requete + ');');
                alasql('insert into '+table+'('+ requete + ');');
            } else {
                console.error('missing parameters');
                console.log(req.body);
            }
        };
    }

    function templateDelete(paramName, table, paramInTable) {
        return function(req, res) {
            let param = req.params[paramName];

            // compte le nombre de lignes supprimer pour les renvoyer
            let rowRemovedNb = alasql('select count(*) from '+table+' where '+paramInTable+' = '+param+';')
            rowRemovedNb = { count: rowRemovedNb[0]['COUNT(*)'] };
            // supprime les lignes
            console.log('delete from '+table+' where '+paramInTable+' = '+param+';');
            alasql('delete from '+table+' where '+paramInTable+' = '+param+';');
            // envoie les infos
            res.set({
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            });
            res.send(JSON.stringify(rowRemovedNb));
        };
    }

    return app;
}
