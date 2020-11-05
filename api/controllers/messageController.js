const alasql = require('alasql');

const Message = require('../model/Message.js');
const Room = require('../model/Room.js');
const autoId = require('../util/autoId.js');

module.exports = class MessageController {
    static getMessages() {
        const tuples = alasql('select * from Message;');
        return tuples.map((m) => new Message(m));
    }
    static getMessage(id) {
        const tuples = alasql('select * from Message where id = '+ id +';');
        return new Message(tuples[0]);
    }
    static getRoomMessages(room) {
        const tuples = alasql('select * from Message where room = '+ room +';');
        return tuples.map((m) => new Message(m));
    }
    /*static getRoomLastMessages(room, messageNb) {
        const tuples = alasql()
    }*/
    static addMessage(body) {
        const message = new Message(body);
        let newId = autoId('Message');
        console.log('insert into Message ('+ newId +','+ message.sender +','+ message.room +','+ message.time +','+ JSON.stringify(message.content) +');');
        return alasql('insert into Message ('+ newId +','+ message.sender +','+ message.room +','+ message.time +','+ JSON.stringify(message.content) +');');
    }
    static deleteMessage(id) {
        alasql('delete from Message where id = '+id+';');
    }

    static getRooms() {
        const tuples = alasql('select * from Room;');
        return tuples.map((m) => new Room(m));
    }
    static getRoom(id) {
        const tuples = alasql('select * from Room where id = '+ id +';');
        return tuples.map((m) => new Room(m));
    }
    static addRoom(body) {
        const room = new Room(body);
        let newId = autoId('Room');
        return alasql('insert into Room ('+ newId +','+ JSON.stringify(room.name) +');');
    }
}
