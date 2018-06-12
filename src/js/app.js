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
            if (note.status === "offen") {
                htmlString += "<input id=\"checkBox\"  onchange='changeStatus(\"" + note.id + "\")' type=\"checkbox\">";
            }
            else {
                htmlString += "<input id=\"checkBox\" checked onchange='changeStatus(\"" + note.id + "\")' type=\"checkbox\">";
            }
            htmlString += " finished";
            htmlString += "</input>";
            htmlString += "</li>";
        }
    )
    ;
    return htmlString;
}

function changeStatus(id) {
    const note = getNoteById(id);
    updateStatus(note);
}

function sendButtonClickEvent(event) {
    if (document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity()) {
        addNote(document.getElementById("title").value, "offen", document.getElementById("description").value, 1, "2018-12-01");
        window.location.replace("index.html");
    }
}

function sort(event) {
    const sort = document.getElementById("finishDate").checked ? 1 : document.getElementById("createDate").checked ? 2 : 3;
    document.getElementById("notes").innerHTML = createNotesList(getNotes(sort));
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

function initSort() {
    if (document.getElementById("sort")) {
        document.getElementById("sort").addEventListener("click", sort);
    }
}

window.onload = function () {
    renderNotes();
    submitButton();
    initSort();
}