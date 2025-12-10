const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String },
    source: { type: String }, // e.g., 'Quran 2:152', 'Hadith'
    category: { type: String, default: 'General' }
});

module.exports = mongoose.model('Quote', QuoteSchema);
