const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController');

router.get("/notes", notes.getNotes);

module.exports = router;