const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const Word = require("../models/word");
const User = require("../models/user");
const ShortWord = require("../models/shortword");

router.get('', (req, res, next) => {
  let wordCount = 0;
  let recentWords;
  let searchHistory;
  let userWords = 0;
  let userFiles = 0;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'this-is-the-password-for-the-hashing-of-the-token');
    User.findById(decodedToken.userId).then((foundUser) => {
      userWords = foundUser.entries.length;
      userFiles = foundUser.fileEntries.length;
    })
  } catch {}
  
  Word.countDocuments().then((result) => {
    wordCount = result;
    Word.find().sort({createdAt: 'descending'}).limit(6)
      .exec((err, result2) => {
        if(err) {
          return res.status(500).json({
            message: "Cannot get recent words"
          });
        } else {
          recentWords = result2;
          ShortWord.find().sort({totalCount: 'descending'}).limit(6)
            .exec((err, result3) => {
              if(err) {
                return res.status(500).json({
                  message: "Cannot retrieve Search History"
                });
              } else {
                res.status(200).json({
                  wordCount: wordCount,
                  words: recentWords,
                  searchWords: result3,
                  userWords: userWords,
                  userFiles: userFiles
                });
              }
          });
        }
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Some error occured. Please try again later!"
    });
  });
});

module.exports = router;
