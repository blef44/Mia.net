const alasql = require('alasql');

module.exports = function(table, columnName = 'id') {
    let newId = alasql('select max('+columnName+') from '+table)[0]['MAX('+columnName+')']+1;
    if (isNaN(newId)) newId = 0;
    return newId;
}
