;(function ($) {
    let client = window.services.restClient;
    $(function () {
        function changeStatus(event) {
            client.changeStatus(event.currentTarget.dataset.value).done(function () {
                renderNotes(getNotes());
            });
        }

        function sendButtonEditEvent(event) {
            client.getNoteById(event.currentTarget.dataset.value).done(function (note) {
                if (note.status === "offen") {
                    window.location.replace("createNote.html?id=" + note._id);
                }
                renderNotes(getNotes());
            }).fail(function (msg) {
                alert(msg);
            });
        }

        function sortFilter() {
            const sort = $('input[name=sort]:checked').val();
            const showFinished = $("#showFinished")[0].checked;
            renderNotes(getNotes(showFinished, sort));
        }

        function renderNotes(notes) {
            if (document.getElementById("notes-template")) {
                const main = $("#main");

                const notesRenderer = Handlebars.compile($("#notes-template").html());
                main.html(notesRenderer({notes: notes}));

                if (document.getElementsByName("editNote")) {
                    let editNotes = document.getElementsByName("editNote");
                    for (let editNote of Array.from(editNotes)) {
                        editNote.addEventListener("click", sendButtonEditEvent);
                    }
                }
                if (document.getElementsByName("checkBoxNote")) {
                    let checkboxes = document.getElementsByName("checkBoxNote");
                    for (let checkbox of Array.from(checkboxes)) {
                        checkbox.addEventListener("click", changeStatus);
                    }
                }
            }
        }

        function getNotes(filter, sort) {
            client.getNotes(filter, sort ? sort : 0).done(function (notes) {
                renderNotes(notes);
            }).fail(function (msg) {
                alert(msg);
            });
        }

        window.onload = function () {
            renderNotes(getNotes());
            document.getElementById("sort").addEventListener("click", sortFilter);
            document.getElementById("showFinished").addEventListener("click", sortFilter);
        }
    });
}(jQuery));
