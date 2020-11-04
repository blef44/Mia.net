module.exports = class Message {
    constructor(obj) {
        this.id = obj.id;
        this.sender = obj.sender;
        this.room = obj.room;
        this.time = obj.time;
        this.content = obj.content;
    }
}