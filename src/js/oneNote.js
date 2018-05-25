var color = sessionStorage.getItem("color");
if( !color )
{
    sessionStorage.setItem("color", JSON.stringify(["white"]));
    color = sessionStorage.getItem("color");
}
color = JSON.parse(color);
document.body.style.backgroundColor = color;

//var notes = sessionStorage.getItem("notes");
//if( !notes )
//{
//    sessionStorage.setItem("notes", JSON.stringify([]));
//    notes = sessionStorage.getItem("notes");
//}
//notes = JSON.parse(notes);

const notes = [
    {"id":"01", "title":"Notiz 1", "status": "offen", "beschreibung":"Abfall entsorgen", "rating":1, "erledigtbis":"2018-12-01"},
    {"id":"02", "title":"Notiz 2", "status": "erledigt", "beschreibung":"Projekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellen", "rating":1, "erledigtbis":"2018-06-28"},
    {"id":"03", "title":"Notiz 3", "status": "offen", "beschreibung":"Dies und das", "rating":3, "erledigtbis":"2019-01-01"},
    {"id":"01", "title":"Notiz 1", "status": "erledigt", "beschreibung":"Abfall entsorgen", "rating":1, "erledigtbis":"2018-12-01"},
    {"id":"02", "title":"Notiz 2", "status": "erledigt", "beschreibung":"Projekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellenProjekt Schule fertig stellen", "rating":1, "erledigtbis":"2018-06-28"},
    {"id":"03", "title":"Notiz 3", "status": "offen", "beschreibung":"Dies und das", "rating":3, "erledigtbis":"2019-01-01"}
];

function changeColor(form_element) {
    sessionStorage.setItem("color", JSON.stringify(form_element.value));
    document.body.style.backgroundColor = form_element.value;
}

function createNotesList (notes) {
    let htmlString ="";
    notes.forEach(function (note) {
        htmlString += "<li>";
        htmlString += "<a href=\"createNote.html\">";
        htmlString += "<h2>";
        htmlString += note.title;
        htmlString+= !note.rating ? "" : " " + "*".repeat(note.rating);
        htmlString += "</h2>";
        htmlString += "<p>";
        htmlString += note.beschreibung;
        htmlString += "</p>";
        htmlString += "<input id=\"checkBox\" type=\"checkbox\">";
        htmlString += " finished";
        htmlString += "</input>";
        htmlString += "</li>";
    });
    return htmlString;
}

function sendButtonClickEvent(event) {
    event.target.dataset.title;
    const notes = JSON.parse(sessionStorage.getItem("notes"));
    notes.push(document.getElementById("title").value);
    sessionStorage.setItem("notes", JSON.stringify(notes));
    window.location.replace("list.html");
}

function renderSongs () {
    if(document.getElementById("notes")){
        document.getElementById("notes").innerHTML=createNotesList(notes);
    }
}

window.onload = function() {
    renderSongs();
    document.getElementById("submit").addEventListener("click", sendButtonClickEvent);
}