const Datastore = require('nedb');
var db = new Datastore({ filename: `users.db`, autoload: true });
exports.db = db;