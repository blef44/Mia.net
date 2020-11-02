const alasql = require('alasql');

module.exports = function(autoId, parameters, table) {
    return function(req, res) {
        let allParameters = true;
        for (var p in parameters) {
            if (p in req.body)
                allParameters = false;
        }
        if (allParameters) {
            let requete = '';
            if (autoId) {
                // le nouvel id correspond au nombre d'annales actuel
                let newId = alasql('select count(*) from '+table);
                requete += newId[0]['COUNT(*)'];

                // envoie le nouvel id crée
                res.set({
                    'Content-Type': 'application/json',
                    'charset': 'utf-8'
                });
                res.send(JSON.stringify({id: newId}));
            }
            for (var i=0; i<parameters.length; i++) {
                if (i!==0 || autoId)
                    requete += ',';
                if (typeof(req.body[parameters[i]]) === 'string')
                    requete += JSON.stringify(req.body[parameters[i]]);
                else
                    requete += req.body[parameters[i]];
            }
            console.log('insert into '+table+'('+ requete + ');');
            alasql('insert into '+table+'('+ requete + ');');
        } else {
            console.error('missing parameters');
            console.log(req.body);
        }
    };
}
