const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String, required: true },
    mood: { type: String }, // e.g., 'Happy', 'Stressed', 'Neutral'
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', JournalSchema);
