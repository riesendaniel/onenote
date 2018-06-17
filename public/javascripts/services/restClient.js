;(function(services, $) {

    const ajaxUtil = window.util.ajax;
    const valueStorage = window.services.valueStorage;
    const tokenKey = "token";


    function getNote(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    services.restClient = {
        getNote,
    };
}(window.services = window.services || { }, jQuery));