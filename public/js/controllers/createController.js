;(function ($) {
    let client = window.services.restClient;
    $(function () {

        function getURLParameter(name) {
            const value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ""])[1]);
            return (value !== 'null') ? value : false;
        }

        const createContainer = $("#createContainer");

        $(createContainer).on("click", ".submit", function () {
            const id = $('#noteID').val();
            const star = $('input[name=radios]:checked').val() ? $('input[name=radios]:checked').val() : 1;

            if (id && $('#title')[0].checkValidity() && $('#description')[0].checkValidity() && $('#datePicker')[0].checkValidity()) {
                client.updateNote(id, $('#title').val(), $('#description').val(), star, $('#datePicker').val()).done(function () {
                    window.location.replace("index.html");
                }).fail(function (msg) {
                    alert(msg);
                });
            } else if ($('#title')[0].checkValidity() && $('#description')[0].checkValidity() && $('#datePicker')[0].checkValidity()) {
                client.addNote($('#title').val(), "offen", $('#description').val(), star, $('#datePicker').val()).done(function () {
                    window.location.replace("index.html");
                }).fail(function (msg) {
                    alert(msg);
                });
            }
        });

        window.onload = function () {
            const urlId = getURLParameter('id');
            if (urlId) {
                client.getNoteById(urlId).done(function (note) {
                    document.getElementById("title").value = note.title;
                    document.getElementById("description").value = note.description;
                    document.getElementById("star" + note.rating).checked = true;
                    document.getElementById("datePicker").value = note.erledigtbis;
                    document.getElementById("noteID").value = note._id;
                }).fail(function (msg) {
                    alert(msg);
                });
            }
        }
    });
}(jQuery));
