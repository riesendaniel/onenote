var notes = sessionStorage.getItem("notes");
if (!notes) {
    sessionStorage.setItem("notes", JSON.stringify([]));
    notes = sessionStorage.getItem("notes");
}
notes = JSON.parse(notes);

function compareNotes(s1, s2) {
    return s1.title < s2.title;
}

function getNotes(orderBy, filterBy) {
    return notes;
}

function addNote(note){
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
}
function updateNote(note){

}

function getNoteById(id){
    notes.forEach(function (note) {
        if(note.id === id){
            return note;
        }
    });
}