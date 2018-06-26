;(function (services) {

    const ajaxUtil = window.util.ajax;

    function getNotes(filter, sort) {
        return ajaxUtil.ajax("GET", "/notes?filter=" + filter + "&sort=" + sort, undefined, undefined);
    }

    function getNoteById(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined, undefined);
    }

    function changeStatus(id) {
        return ajaxUtil.ajax("POST", "/changeStatus/", {
            id: id
        }, undefined);
    }

    function updateNote(id, title, description, rating, erledigtBis) {
        return ajaxUtil.ajax("POST", "/updateNote/", {
            id: id,
            title: title,
            description: description,
            rating: rating,
            erledigtBis: erledigtBis,
        }, undefined);
    }

    function addNote(title, status, description, rating, erledigtBis) {
        return ajaxUtil.ajax("POST", "/notes/", {
            title: title,
            status: status,
            description: description,
            rating: rating,
            erledigtBis: erledigtBis,
        }, undefined);
    }

    services.restClient = {
        getNotes,
        getNoteById,
        updateNote,
        changeStatus,
        addNote
    };
}(window.services = window.services || {}, jQuery));