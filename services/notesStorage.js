const Datastore = require('nedb-promise');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

getNotes().then((r) => {
    console.log(r);
});

async function getNotes()
{
    return await db.find({});
}

module.exports = {all : getNotes};


//console.log(db);

//var data = sessionStorage.getItem("notes");
//var notes = data ? JSON.parse(data) : [];
/*
function compareNotesByFinished(s1, s2) {
    return s1.erledigtbis > s2.erledigtbis;
}

function compareNotesByCreated(s1, s2) {
    return s1.created < s2.created;
}

function compareNotesByImportance(s1, s2) {
    return s1.rating < s2.rating;
}

function getNotes(orderBy, filterBy) {
    //var data = sessionStorage.getItem("notes");
    var tempNotes = [];//data ? JSON.parse(data) : [];

    if (filterBy) {
        tempNotes = tempNotes.filter(note => note.status == "erledigt");
    }
    if (orderBy) {
        switch (orderBy) {
            case 1:
                tempNotes.sort((a, b) => compareNotesByFinished(a, b));
                break;
            case 2:
                tempNotes.sort((a, b) => compareNotesByCreated(a, b));
                break;
            case 3:
                tempNotes.sort((a, b) => compareNotesByImportance(a, b));
                break;
            default:
        }
    }
    return tempNotes;
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function addNote(title, status, description, rating, erledigtBis) {
    const note = JSON.parse('{"id": "' + guid() + '", "title": "' + title + '", "status": "' + status + '", "created": "' + new Date() + '", "finished": "' + null + '", "description": "' + description + '", "rating": ' + rating + ', "erledigtbis": "' + erledigtBis + '"}');
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
}

function updateNote(note) {
    notes = notes.filter(t => t.id !== note.id);
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
}

function updateNoteData(id, title, description, rating, erledigtbis) {
    const note = getNoteById(id);
    updateNote({...note, title: title, description: description, rating: rating, erledigtbis: erledigtbis})
}

function updateStatus(note) {
    if (note.status == "offen") {
        updateNote({...note, status: "erledigt", finished: new Date()})
    } else {
        updateNote({...note, status: "offen", finished: null})
    }
}

function getNoteById(id) {
    return notes.filter(note => note.id === id)[0];
}*/