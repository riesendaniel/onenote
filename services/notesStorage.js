const Datastore = require('nedb-promise');
const db = new Datastore({filename: './data/notes.db', autoload: true});

async function getNotes(filter, sort) {
    const fil = filter === "true" ? {"status": "erledigt"} : {};
    if (sort === "1") {
        return await db.cfind(fil).sort({erledigtbis: 1}).exec();
    } else if (sort === "2") {
        return await db.cfind(fil).sort({created: 1}).exec();
    } else if (sort === "3") {
        return await db.cfind(fil).sort({rating: -1}).exec();
    }
    return await db.find(fil);
}

async function getNoteById(id) {
    return await db.findOne({_id: id});
}

async function updateNote(id, title, description, rating, erledigtbis) {
    return await db.update({_id: id}, {
        $set: {
            "title": title,
            "description": description,
            "rating": rating,
            "erledigtbis": erledigtbis
        }
    });
}

async function changeStatus(id) {
    await getNoteById(id).then((note) => {
        if (note.status === "offen") {
            return db.update({_id: id}, {$set: {"status": "erledigt", "finished": new Date()}});
        } else {
            return db.update({_id: id}, {$set: {"status": "offen", "finished": null}});
        }
    });
}

async function addNote(title, status, description, rating, erledigtBis) {
    const note = JSON.parse('{"title": "' + title + '", "status": "' + status + '", "created": "' + new Date() + '", "finished": "' + null + '", "description": "' + description + '", "rating": ' + rating + ', "erledigtbis": "' + erledigtBis + '"}');
    return await db.insert(note);
}

module.exports = {all: getNotes, byId: getNoteById, add: addNote, update: updateNote, changeStatus: changeStatus};