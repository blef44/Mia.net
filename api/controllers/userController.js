const alasql = require('alasql');

const User = require('../model/User.js');
const autoId = require('../util/autoId');

module.exports = class UserController {
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
