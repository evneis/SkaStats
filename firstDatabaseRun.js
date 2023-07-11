var Datastore = require('nedb');


var db = new Datastore({filename: `users.db`, autoload: true});

// var test2 = {
//     discord: 'axb',
//     username: 'anotha12'
// }
//
// db.insert(test2, function(err, doc) {
//     console.log('Inserted', doc.username, 'with ID', doc._id);
// });

// db.findOne({ discord: 'abba' }, function(err, doc) {
//     if(doc.username != null){
//         console.log('not null!!!');
//     }else{
//         console.log('Found user:', doc.username);
//     }
// });


// db.update({ discord: 'axb' }, { discord: 'axb', username: 'not anotha' }, { upsert: true }, function (err, numReplaced, upsert) {
//     // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
//     // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
//   });

db.findOne({ discord: 'axb' }, function(err, doc) {
    console.log(`Found ${doc.username}`)
})