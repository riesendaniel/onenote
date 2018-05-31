var color = sessionStorage.getItem("color");
if (!color) {
    sessionStorage.setItem("color", JSON.stringify(["white"]));
    color = sessionStorage.getItem("color");
}
color = JSON.parse(color);
document.body.style.backgroundColor = color;


function changeColor(form_element) {
    sessionStorage.setItem("color", JSON.stringify(form_element.value));
    document.body.style.backgroundColor = form_element.value;
}

function createNotesList(notes) {
    let htmlString = "";
    notes.forEach(function (note) {
        htmlString += "<li>";
        htmlString += "<a href=\"createNote.html\">";
        htmlString += "<h2>";
        htmlString += note.title;
        htmlString += !note.rating ? "" : " " + "*".repeat(note.rating);
        htmlString += "</h2>";
        htmlString += "<p>";
        htmlString += note.description;
        htmlString += "</p>";
        htmlString += "<input id=\"checkBox\" type=\"checkbox\">";
        htmlString += " finished";
        htmlString += "</input>";
        htmlString += "</li>";
    });
    return htmlString;
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

function sendButtonClickEvent(event){
    if(document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity()) {
        var note = JSON.parse('{"id":"' + guid() + '", "title":"' + document.getElementById("title").value + '", "status": "offen", "description":"'
            + document.getElementById("description").value + '", "rating":1, "erledigtbis":"2018-12-01"}');
        addNote(note)
        window.location.replace("index.html");
    }
}

function renderNotes() {
    if (document.getElementById("notes")) {
        document.getElementById("notes").innerHTML = createNotesList(getNotes());
    }
}

function submitButton() {
    if (document.getElementById("submit")) {
        document.getElementById("submit").addEventListener("click", sendButtonClickEvent);
    }
}

window.onload = function () {
    renderNotes();
    submitButton();
}