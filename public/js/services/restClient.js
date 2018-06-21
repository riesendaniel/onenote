;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function getNotes() {
        return ajaxUtil.ajax("GET", "/notes/", undefined);
    }

    services.restClient = {
        getNotes
    };
}(window.services = window.services || { }, jQuery));