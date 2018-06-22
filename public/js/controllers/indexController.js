;(function($) {
    let client = window.services.restClient;
    $(function(){
        function changeStatus(event) {
            const note = getNoteById(event.currentTarget.dataset.value);
            updateStatus(note);
        }

        function sendButtonEditEvent(event) {
            client.getNoteById(event.currentTarget.dataset.value).done(function(note){
                if(note.status === "offen"){
                    window.location.replace("createNote.html?id=" + note._id);
                }
                renderNotes(getNotes());
            })
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

        function getNotes()
        {
            client.getNotes().done(function(notes){
                renderNotes(notes);
            })
        }

        window.onload = function () {
            renderNotes(getNotes());
            document.getElementById("sort").addEventListener("click", sortFilter);
            document.getElementById("showFinished").addEventListener("click", sortFilter);
        }


    });
}(jQuery));
