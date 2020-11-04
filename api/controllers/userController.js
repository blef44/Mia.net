const alasql = require('alasql');

const User = require('../model/User.js');
const autoId = require('../util/autoId');

module.exports = class UserController {
    /*getMessages(params) {
        const tuples = alasql('select * from Message;');
        return tuples.map((m) => new Message(m));
    }
    getMessage(params) {
        const tuples = alasql('select * from Message where id = ' + id);
        return new Message(tuples[0]);
    }
    addMessage(body) {
        const message = new Message(body);
        let newId = autoId('Message');
        return alasql('insert into Messages ('+newId+','+JSON.stringify(message[sender])+','+message[time]+','+JSON.stringify(message[content])+')');
    }*/
    static getUsers() {
        const tuples = alasql('select * from User;');
        return tuples.map((m) => new User(m));
    }
    static getUser(id) {
        const tuples = alasql('select * from User where id = ' + id);
        return new User(tuples[0]);
    }
    static getUserName(id) {
        const tuples = alasql('select name from User where id = ' + id);
        return new User(tuples[0]).name;
    }
    static addUser(body) {
        const user = new User(body);
        let newId = autoId('User');
        return alasql('insert into User ('+newId+','+JSON.stringify(user.name)+')');
    }
}
