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
            insert into User(0, "Mia");
            insert into Room(0, "Chat");
            insert into Message(0, 0, 0, 37, "Ceci est un message de test");
        `);
        res.send('Les données exemples ont été ajoutées');
    });
}
