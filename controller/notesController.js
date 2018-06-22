const notesStore = require("../services/notesStorage");

class NotesController {
    async getNotes(req, res) {
        res.json((await notesStore.all(req.query.filter) || []))
    }

    async getNoteById(req, res) {
        res.json((await notesStore.byId(req.params.id) || []))
    }

    async updateNote(req, res) {
        res.json(await notesStore.update(req.body.id, req.body.title, req.body.description, req.body.rating, req.body.erledigtBis))
    }

    async changeStatus(req, res) {
        res.json(await notesStore.changeStatus(req.body.id))
    }

    async addNote(req, res) {
        res.json(await notesStore.add(req.body.title, req.body.status, req.body.description, req.body.rating, req.body.erledigtBis))
    }
}

module.exports = new NotesController();