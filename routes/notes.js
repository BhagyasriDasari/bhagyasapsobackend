const express = require('express');
const Note = require('../model/Note');
const auth = require('../middleware/auth');
const router = express.Router();

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      user: req.user.id,
      content: req.body.content,
      tags: req.body.tags,
      backgroundColor: req.body.backgroundColor,
      isArchived: false,
      reminder: req.body.reminder
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get notes
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized');
    }
    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized');
    }
    await note.remove();
    res.send('Note deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
