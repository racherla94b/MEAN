const fs = require('fs');

var Word = require("../models/word");

exports.getWord = (req, res, next) => {
  Word.findById(req.params.id).then((foundWord) => {
    fs.writeFile('word.json', foundWord, (err) => {
      if(err) { console.log(err); }
      // res.sendFile('./word.json');
    });
  }).catch(err => {
    console.log(err);
  });
}
