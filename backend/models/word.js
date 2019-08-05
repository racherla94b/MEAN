const mongoose = require('mongoose');

const User = require('./user');
const ShortWord =require('./shortword');

const wordSchema = mongoose.Schema({
    Title: String,
    Creator: String,
    Subject: String,
    Description: String,
    Publisher: String,
    Contributor: String,
    Daydate: String,
    Type: String,
    Format: String,
    Identifier: String,
    Source: String,
    Language: String,
    Relation: String,
    Coverage: String,
    Rights: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: String,
    createdAt: Date
});

wordSchema.post('save', function(entry) {
  User.findById(entry.userId, function(err, user) {
    user.entries.push(entry._id);
    user.save();
  });
  var shorty = new ShortWord({
	   Title: entry.Title,
	   username: entry.username,
	   wordId: entry._id
	});
  shorty.save();
});

wordSchema.post('remove', function(entry) {
  User.findById(entry.userId, function(err, user) {
    user.entries.pull(entry._id);
    user.save();
  });
});

wordSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model("Word", wordSchema);
