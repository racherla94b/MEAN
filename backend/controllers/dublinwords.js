var Word = require("../models/word");
var User = require("../models/user");
var ShortWord = require("../models/shortword");

exports.createWord = (req, res, next) => {
  let newWord = req.body;
  newWord.userId = req.userData.id;
  newWord.username = req.userData.name;
  newWord.createdAt = Date.now();

  Word.create(newWord)
    .then((createdWord) => {
      res.status(201).json({
        message: "Word added successfully",
        id: createdWord._id
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Cannot complete request"
      });
  });
}

exports.getWords = (req, res, next) => {
  var searchWord = req.query.word;
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const wordQuery = Word.find({$text: {$search: searchWord}});
  let fetchedWords;

  if(pageSize && currentPage) {
    wordQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  wordQuery.exec().then((docs) => {
    if(!docs) {
      return res.status(404).json({
        message: "No words found",
        count: 0
      });
    }
    fetchedWords = docs;
    for(var i = 0; i < fetchedWords.length; i++) {
      ShortWord.find({wordId: fetchedWords[i]._id}, function(err, shorty) {
        shorty[0].totalCount++;
        shorty[0].save();
    	});
    }
    return Word.countDocuments({$text: {$search: searchWord}});
  }).then((count) => {
    res.status(200).json({
      message: "Found some words",
      words: fetchedWords,
      count: count
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: "Error occured",
      count: 0
    });
  });
}

exports.getWord = (req, res, next) => {
  Word.findById(req.params.id).then((wordFound) => {
    if(wordFound) {
      res.status(200).json({
        message: "Found word",
        word: wordFound
      });
    } else {
      res.status(404).json({
        message: "Word not found"
      });
    }
  });
}

exports.updateWord = (req, res, next) => {
  let updatedWord = req.body;
  Word.updateOne({ _id: req.params.id, userId: req.userData.id }, updatedWord)
    .then((result) => {
      console.log(result);
      if(result.n > 0) {
        res.status(200).json({
          message: "Updated successfully",
        });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
  });
}

exports.deleteWord = (req, res, next) => {
  let wordId = req.params.id;
  let userId = req.userData.id;

  Word.deleteOne({ _id: req.params.id, userId: req.userData.id })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        User.findById(userId)
          .then((user) => {
            user.entries.pull(wordId);
            user.save();
          })
          .catch((err) => {console.log(err);
        });
        ShortWord.deleteOne({wordId: wordId}, (err) => {
          if(err) {console.log(err);}
        });
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
  });
}
