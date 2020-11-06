const alasql = require('alasql');
//const SQL = function(s) { console.log(s); return alasql(s); }
const SQL = alasql;

const User = require('../model/User.js');
const autoId = require('../util/autoId');
const escapeString = require('../util/escapeString.js');

module.exports = class UserController {
    static getUsers() {
        const tuples = SQL(`select * from User;`);
        return tuples.map((m) => new User(m));
    }
    static getUser(id) {
        const tuples = SQL(`select * from User where id = ${id};`);
        return new User(tuples[0]);
    }
    static getUserName(id) {
        const tuples = SQL(`select name from User where id = ${id};`);
        return new User(tuples[0]).name;
    }
    static addUser(body) {
        const user = new User(body);
        let newId = autoId('User');
        return SQL(`insert into User (${newId}, ${escapeString(user.name)});`);
    }
}
