const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {all : publicAll};