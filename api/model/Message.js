module.exports = class Message {
    constructor(obj) {
        this.id = obj.id;
        this.sender = obj.sender;
        this.time = obj.time;
        this.content = obj.content;
    }
}