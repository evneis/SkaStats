var Datastore = require('nedb');


var db = new Datastore({filename: `users.db`, autoload: true});

var test2 = {
    discord: 'axb',
    username: 'anotha12'
}

db.insert(test2, function(err, doc) {
    console.log('Inserted', doc.name, 'with ID', doc._id);
});