const alasql = require('alasql');

module.exports = function(paramName, table, paramInTable, singleRow = true, columns = '*') {
    return function(req, res) {
        let param = req.params[paramName];
        if (typeof(param) === 'string') {
            param = JSON.stringify(param);
        }

        console.log('select '+columns+' from '+table+' where '+paramInTable+' = '+param+';');
        let tuples = alasql('select '+columns+' from '+table+' where '+paramInTable+' = '+param+';');
        res.set({
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        });
        if (singleRow)
            res.send(JSON.stringify(tuples[0]));
        else
            res.send(JSON.stringify(tuples));
    };
}
