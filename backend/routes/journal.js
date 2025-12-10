const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');

// Get all entries
router.get('/', auth, async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 });
        res.json(journals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create entry
router.post('/', auth, async (req, res) => {
    const { title, content, mood } = req.body;
    try {
        const newJournal = new Journal({
            title,
            content,
            mood,
            user: req.user.id
        });
        const journal = await newJournal.save();
        res.json(journal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete entry
router.delete('/:id', auth, async (req, res) => {
    try {
        let journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({ msg: 'Journal not found' });
        if (journal.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Journal.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Journal removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
