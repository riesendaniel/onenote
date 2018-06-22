const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');

router.get("/notes/", notesController.getNotes);
router.post("/notes/", notesController.addNote);
router.get("/notes/:id/", notesController.getNoteById);

router.post("/updateNote/", notesController.updateNote);

module.exports = router;