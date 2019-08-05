const mongoose = require("mongoose");

const User = require('./user');

const uploadFileSchema = mongoose.Schema({
  filePath: String,
  fileName: String,
  fileExt: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: String
});

// uploadFileSchema.post('save', function(entry) {
//   User.findById(entry.userId, function(err, user) {
//     console.log(err);
//     user.fileEntries.push(entry._id);
//     user.save();
//   });
//   console.log(entry.userId);
// });
//
// uploadFileSchema.post('remove', function(entry) {
//   User.findById(entry.userId, function(err, user) {
//     user.fileEntries.pull(entry._id);
//     user.save();
//   });
// });

module.exports = mongoose.model("UploadFile", uploadFileSchema);
