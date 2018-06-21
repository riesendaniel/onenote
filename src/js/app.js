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

function getURLParameter(name) {
    const value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ""])[1]);
    return (value !== 'null') ? value : false;
}
function changeStatus(event) {
    const note = getNoteById(event.currentTarget.dataset.value);
    updateStatus(note);
}

function sendButtonEditEvent(event) {
    const note = getNoteById(event.currentTarget.dataset.value);
    if(note.status === "offen"){
        window.location.replace("createNote.html?id=" + note.id);
    }
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
    renderNotes(getNotes(sort, showFinished));
}



function renderNotes(notes) {
    if (document.getElementById("notes-template")) {
        const main = $("#main");

        const notesRenderer = Handlebars.compile($("#notes-template").html());
        main.html(notesRenderer({notes : notes}));

        if(document.getElementsByName("editNote")){
            let editNotes = document.getElementsByName("editNote");
            for (let editNote of Array.from(editNotes)) {
                editNote.addEventListener("click", sendButtonEditEvent);
            }
        }
        if(document.getElementsByName("checkBoxNote")){
            let checkboxes = document.getElementsByName("checkBoxNote");
            for (let checkbox of Array.from(checkboxes)) {
                checkbox.addEventListener("click", changeStatus);
            }
        }
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
    renderNotes(getNotes());
    submitButton();
    initSortFilter();

    const urlId = getURLParameter('id');
    if (urlId) {
        const note = getNoteById(urlId);
        document.getElementById("title").value = note.title;
        document.getElementById("description").value = note.description;
        document.getElementById("star" + note.rating).checked = true;
        document.getElementById("datePicker").value = note.erledigtbis;
        document.getElementById("noteID").value = note.id;
    }
}