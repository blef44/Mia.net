const alasql = require('alasql');

module.exports = function(table) {
    return alasql('select count(*) from '+table)[0]['COUNT(*)'];
}