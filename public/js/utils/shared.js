let color = sessionStorage.getItem("color");
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

if (document.getElementById("colorSelector")) {
    let colors = document.getElementsByName("color");
    for (let curColor of Array.from(colors)) {
        if (color === curColor.value) {
            curColor.selected = true;
        }
    }
}