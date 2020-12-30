module.exports = class Room {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.creator = obj.creator;
        this.date = obj.date;
    }
}