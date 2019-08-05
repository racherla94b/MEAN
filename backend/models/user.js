const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Word = require('./word');
const UploadFile = require('./upload');

const userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word'
  }],
  fileEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UploadFile'
  }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
