const alasql = require('alasql');

const templateGet = require('../util/templateGet.js');
const templatePost = require('../util/templatePost.js');
const Message = require('../model/Message.js');

module.exports = function(app) {
	app.get('/message/', function(req, res) {
        const tuples = alasql('select * from Message;');
        const messages = tuples.map((m) => new Message(m));
        res.set({
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        });
        res.send(JSON.stringify(messages));
    }); // liste messages
    app.get('/message/:idMessage/', templateGet('idMessage', 'Message', 'id')); // infos et contenu message

    app.post('/message/', templatePost(true, ['sender', 'time', 'content'], 'Message'));
}
