var data = sessionStorage.getItem("notes");
var notes = data ? JSON.parse(data) : [];

function compareNotesByFinished(s1, s2) {
    console.log(s1.finished, s2.finished, s1.finished > s2.finished);
    return s1.finished > s2.finished;
}

function compareNotesByCreated(s1, s2) {
    return s1.created < s2.created;
}

function compareNotesByImportance(s1, s2) {
    return s1.rating < s2.rating;
}

function getNotes(orderBy, filterBy) {
    if (filterBy) {
        notes.filter(note => note.status === "closed");
    }
    if (orderBy) {
        switch(orderBy) {
            case 1:
                notes.sort((a, b) => compareNotesByFinished(a, b));
                break;
            case 2:
                notes.sort((a, b) => compareNotesByCreated(a, b));
                break;
            case 3:
                notes.sort((a, b) => compareNotesByImportance(a, b));
                break;
            default:
        }
    }
    return notes;
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
    var note = JSON.parse('{"id": "' + guid() + '", "title": "' + title + '", "status": "' + status + '", "created": "' +  new Date() + '", "finished": "' + null + '", "description": "' + description + '", "rating": ' + rating + ', "erledigtbis": "' + erledigtBis + '"}');
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
}

function updateNote(note) {
    const tempToDos = notes.filter(t => t.id !== note.id);
    notes = tempToDos;
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
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
}