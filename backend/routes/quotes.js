const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// Get random quote
router.get('/random', async (req, res) => {
    try {
        const count = await Quote.countDocuments();

        if (count === 0) {
            // Seed default quotes if empty
            const defaultQuotes = [
                { text: "Verily, with hardship comes ease.", source: "Quran 94:6", category: "Hope" },
                { text: "Allah does not burden a soul beyond that it can bear.", source: "Quran 2:286", category: "Strength" },
                { text: "Do not lose hope, nor be sad.", source: "Quran 3:139", category: "Comfort" },
                { text: "And He found you lost and guided [you].", source: "Quran 93:7", category: "Guidance" },
                { text: "Indeed, Allah is with the patient.", source: "Quran 2:153", category: "Patience" }
            ];
            await Quote.insertMany(defaultQuotes);
            const quote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
            return res.json(quote);
        }

        const random = Math.floor(Math.random() * count);
        const quote = await Quote.findOne().skip(random);
        res.json(quote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add quote (admin or seed)
router.post('/', async (req, res) => {
    const { text, author, source, category } = req.body;
    try {
        const newQuote = new Quote({ text, author, source, category });
        const quote = await newQuote.save();
        res.json(quote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
