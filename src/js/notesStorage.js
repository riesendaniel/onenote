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
    if(filterBy){
        return notes.filter(note => note.status === "closed");
    }
    return notes;
}

class Note {
    constructor(title, status) {
        this.id = guid();
        this.title = String(title);
        this.status = status;
    }

    changeStatus(){
        if(this.status === "offen"){
            this.status = "closed";
        }else{
            this.status = "offen";
        }
    }
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

function addNote(note){
    new Note(note.title);
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