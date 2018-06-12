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
            if (note.status === "offen") {
                htmlString += "<a onclick='editNote(\"" + note.id + "\")'>";
            } else {
                htmlString += "<a>";
            }
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
            htmlString += " finished ( " + note.erledigtbis + " )";
            htmlString += "</input>";
            htmlString += "</li>";
        }
    )
    ;
    return htmlString;
}

function getURLParameter(name) {
    var value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ""])[1]);
    return (value !== 'null') ? value : false;
}

function editNote(id) {
    window.location.replace("createNote.html?id=" + id);
}

function changeStatus(id) {
    const note = getNoteById(id);
    updateStatus(note);
}

function sendButtonClickEvent(event) {
    const id = document.getElementById("noteID").value;

    const star = document.getElementById("star1").checked ? 1 : document.getElementById("star2").checked ? 2 : document.getElementById("star3").checked ? 3 : document.getElementById("star4").checked ? 4 : document.getElementById("star5").checked ? 5 : 0;

    if (id && document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
        updateNoteData(id, document.getElementById("title").value, document.getElementById("description").value, star, document.getElementById("datePicker").value)
    } else if (document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
        addNote(document.getElementById("title").value, "offen", document.getElementById("description").value, star, document.getElementById("datePicker").value);
        window.location.replace("index.html");
    }
}

function sortFilter(event) {
    const sort = document.getElementById("finishDate").checked ? 1 : document.getElementById("createDate").checked ? 2 : 3;
    const showFinished = document.getElementById("showFinished").checked;
    document.getElementById("notes").innerHTML = createNotesList(getNotes(sort, showFinished));
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

function initSortFilter() {
    if (document.getElementById("sort") && document.getElementById("showFinished")) {
        document.getElementById("sort").addEventListener("click", sortFilter);
        document.getElementById("showFinished").addEventListener("click", sortFilter);
    }
}

window.onload = function () {
    renderNotes();
    submitButton();
    initSortFilter();

    var urlId = getURLParameter('id');
    if (urlId) {
        const note = getNoteById(urlId);
        document.getElementById("title").value = note.title;
        document.getElementById("description").value = note.description;
        document.getElementById("urgency").value = note.erledigtbis;
        document.getElementById("noteID").value = note.id;

    }
}