const alasql = require('alasql');

module.exports = function(app) {
    app.get('/test/dropAll', function(req, res) {
        alasql(`
            drop table Message;
            drop table User;
            drop table Room;
        `);
        res.send('La base de donnée a été vidée de ses tables');
    });
    app.get('/test/clearAll', function(req, res) {
        alasql(`
            delete from Message;
            delete from User;
            delete from Room;
        `);
        res.send('La base de donnée a été vidée de son contenu');
    });
    app.get('/test/insertExample', function(req, res) {
        alasql(`
             -- Insertion de données exemples
            insert into User(0, "Efflam");
            insert into User(1, "Bleuenn");
            insert into User(2, "Maud");
            insert into User(3, "Laurent");
            insert into Room(0, "Mot de passe Wifi");
            insert into Message(0, 0, -1, 37, "Bonjour et bienvenue sur le chat");
            insert into Message(1, 0, 0, 37, "Il serait pratique d'avoir un mdp wifi personnalisé. Quelles sont vos propositions ?");
        `);
        res.send('Les données exemples ont été ajoutées');
    });
}
