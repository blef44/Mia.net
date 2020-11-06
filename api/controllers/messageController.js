const alasql = require('alasql');
//const SQL = function(s) { console.log(s); return alasql(s); }
const SQL = alasql;

const Message = require('../model/Message.js');
const Room = require('../model/Room.js');
const autoId = require('../util/autoId.js');
const escapeString = require('../util/escapeString.js');

module.exports = class MessageController {
    static getMessages() {
        const tuples = SQL(`select * from Message;`);
        return tuples.map((m) => new Message(m));
    }
    static getMessage(id) {
        const tuples = SQL(`select * from Message where id = ${id};`);
        return new Message(tuples[0]);
    }
    static getRoomMessages(room) {
        const tuples = SQL(`select * from Message where room = ${room};`);
        return tuples.map((m) => new Message(m));
    }
    /*static getRoomLastMessages(room, messageNb) {
        const tuples = alasql()
    }*/
    static addMessage(body) {
        const message = new Message(body);
        const newId = autoId('Message');
        return SQL(`insert into Message (${newId}, ${message.sender}, ${message.room}, ${message.time}, ${escapeString(message.content)});`);
    }
    static deleteMessage(id) {
        SQL(`delete from Message where id = ${id};`);
    }

    static getRooms() {
        const tuples = SQL(`select * from Room;`);
        return tuples.map((m) => new Room(m));
    }
    static getRoom(id) {
        const tuples = SQL(`select * from Room where id = ${id};`);
        return new Room(tuples[0]);
    }
    static addRoom(body) {
        const room = new Room(body);
        let newId = autoId('Room');
        return SQL(`insert into Room (${newId}, ${escapeString(room.name)});`);
    }
}
