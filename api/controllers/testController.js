const alasql = require('alasql');

module.exports = function(app) {
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
}
