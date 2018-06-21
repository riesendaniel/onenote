const notesStore = require("../services/notesStorage");

module.exports.getNotes = function(req, res)
{
    res.json((notesStore.all(req) || []))
};