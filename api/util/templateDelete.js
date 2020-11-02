const alasql = require('alasql');

module.exports = function(paramName, table, paramInTable) {
    return function(req, res) {
        let param = req.params[paramName];

        // compte le nombre de lignes supprimer pour les renvoyer
        let rowRemovedNb = alasql('select count(*) from '+table+' where '+paramInTable+' = '+param+';')
        rowRemovedNb = { count: rowRemovedNb[0]['COUNT(*)'] };
        // supprime les lignes
        console.log('delete from '+table+' where '+paramInTable+' = '+param+';');
        alasql('delete from '+table+' where '+paramInTable+' = '+param+';');
        // envoie les infos
        res.set({
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        });
        res.send(JSON.stringify(rowRemovedNb));
    };
}
