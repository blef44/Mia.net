const alasql = require('alasql');

module.exports = function(table, columnName = 'id') {
    return alasql('select max('+columnName+') from '+table)[0]['MAX('+columnName+')']+1;
}