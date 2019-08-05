const mongoose = require('mongoose');

const Word = require('./word');

const shortWordSchema = mongoose.Schema({
	Title: String,
	username: String,
	totalCount: { type: Number, default: 0},
	wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
});

module.exports = mongoose.model("ShortWord", shortWordSchema);
