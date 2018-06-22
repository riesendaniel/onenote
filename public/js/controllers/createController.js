;(function ($) {
    let client = window.services.restClient;
    $(function () {

        function getURLParameter(name) {
            const value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ""])[1]);
            return (value !== 'null') ? value : false;
        }

        var createContainer = $("#createContainer");

        $(createContainer).on("click", ".submit", function (event) {
            const id = document.getElementById("noteID").value;
            const star = document.getElementById("star1").checked ? 1 : document.getElementById("star2").checked ? 2 : document.getElementById("star3").checked ? 3 : document.getElementById("star4").checked ? 4 : document.getElementById("star5").checked ? 5 : 0;
            if (id && document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
                client.updateNote(id, document.getElementById("title").value, document.getElementById("description").value, star, document.getElementById("datePicker").value).done(function (msg) {
                    window.location.replace("index.html");
                }).fail(function (msg) {
                    console.log(msg);
                });
            } else if (document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
                client.addNote(document.getElementById("title").value, "offen", document.getElementById("description").value, star, document.getElementById("datePicker").value).done(function (msg) {
                    window.location.replace("index.html");
                }).fail(function (msg) {
                    console.log(msg);
                });
            }
        });

        /*function sendButtonClickEvent(event) {
            const id = document.getElementById("noteID").value;
            const star = document.getElementById("star1").checked ? 1 : document.getElementById("star2").checked ? 2 : document.getElementById("star3").checked ? 3 : document.getElementById("star4").checked ? 4 : document.getElementById("star5").checked ? 5 : 0;

            if (id && document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
                updateNoteData(id, document.getElementById("title").value, document.getElementById("description").value, star, document.getElementById("datePicker").value)
            } else if (document.getElementById("title").checkValidity() && document.getElementById("description").checkValidity() && document.getElementById("datePicker").checkValidity()) {
                //client.addNote(document.getElementById("title").value, "offen", document.getElementById("description").value, star, document.getElementById("datePicker").value);
                client.addNote(document.getElementById("title").value, "offen", document.getElementById("description").value, star, document.getElementById("datePicker").value).done(function (msg) {
                    window.location.replace("index.html");
                    //renderOrders();
                }).fail(function( msg ) {
                    console.log(msg);
                });
            }
        }*/

        window.onload = function () {
            const urlId = getURLParameter('id');
            if (urlId) {
                client.getNoteById(urlId).done(function (note) {
                    document.getElementById("title").value = note.title;
                    document.getElementById("description").value = note.description;
                    document.getElementById("star" + note.rating).checked = true;
                    document.getElementById("datePicker").value = note.erledigtbis;
                    document.getElementById("noteID").value = note._id;
                })
            }
        }
    });
}(jQuery));