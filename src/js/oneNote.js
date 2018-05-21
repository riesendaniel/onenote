var color = sessionStorage.getItem("color");
if( !color )
{
    sessionStorage.setItem("color", JSON.stringify(["white"]));
    color = sessionStorage.getItem("color");
}
color = JSON.parse(color);
document.body.style.backgroundColor = color;

var notes = sessionStorage.getItem("notes");
if( !notes )
{
    sessionStorage.setItem("notes", JSON.stringify([]));
    notes = sessionStorage.getItem("notes");
}
notes = JSON.parse(notes);
document.getElementById("text").innerText = notes.length == 0 ? "none" : notes.join(" ");

function changeColor(form_element) {
    sessionStorage.setItem("color", JSON.stringify(form_element.value));
    document.body.style.backgroundColor = form_element.value;
}

function send(){
    const notes = JSON.parse(sessionStorage.getItem("notes"));
    notes.push(document.getElementById("title").value);
    sessionStorage.setItem("notes", JSON.stringify(notes));
    window.location.replace("list.html");
};