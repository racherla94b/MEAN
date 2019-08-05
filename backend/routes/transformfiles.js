const express = require("express");
var router = express.Router();
const path = require("path");
var js2xmlparser = require("js2xmlparser");
const Json2csvParser = require('json2csv').Parser;

const fs = require('fs');

var Word = require("../models/word");

const checkAuth = require("../middleware/auth-check");

const DownloadController = require('../controllers/transformfiles');

router.get('/:id/json', checkAuth, (req, res, next) => {
  Word.findById(req.params.id).then((foundWord) => {
    fs.writeFile('backend/downloads/word.json', JSON.stringify(foundWord), (err) => {
      if(err) { console.log(err); }
      console.log('json file saved');
      var filepath = path.join(__dirname, '../downloads/word.json');
      res.sendFile(filepath);
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: "Cannot find word"
    });
  });
});

router.get('/:id/xml', checkAuth, (req, res, next) => {
  Word.findById(req.params.id).then((foundWord) => {
    var newWord = foundWord.toObject();
    delete newWord._id;
    delete newWord.__v;
    delete newWord.userId;

    fs.writeFile('backend/downloads/word.xml', js2xmlparser.parse("word", newWord), (err) => {
      if(err) { console.log(err); }
      console.log('xml file saved');
      var filepath = path.join(__dirname, '../downloads/word.xml');
      res.sendFile(filepath);
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: "Cannot find word"
    });
  });
});

router.get('/:id/csv', checkAuth, (req, res, next) => {
  Word.findById(req.params.id).then((foundWord) => {
    let theWord = foundWord.toObject();
    let fields = Object.keys(theWord);

    fields.splice(fields.indexOf('_id'), 1);
    fields.splice(fields.indexOf('userId'), 1);
    fields.splice(fields.indexOf('__v'), 1);

    let json2csvParser = new Json2csvParser({ fields });
    let csv = json2csvParser.parse(theWord);

    fs.writeFile('backend/downloads/word.csv', csv, (err) => {
      if(err) { console.log(err); }
      console.log('csv file saved');
      var filepath = path.join(__dirname, '../downloads/word.csv');
      res.sendFile(filepath);
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: "Cannot find word"
    });
  });
});

router.get('/:id/txt', checkAuth, (req, res, next) => {
  Word.findById(req.params.id).then((foundWord) => {
    let theWord = foundWord.toObject();
    let fields = Object.keys(theWord);
    var str='';
    for(var i=0; i < fields.length; i++) {
      str += fields[i] + ": ";
      str += theWord[fields[i]];
      str += '\r\n';
    }

    fs.writeFile('backend/downloads/word.txt', str, (err) => {
      if(err) { console.log(err); }
      console.log('txt file saved');
      var filepath = path.join(__dirname, '../downloads/word.txt');
      res.sendFile(filepath);
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: "Cannot find word"
    });
  });
});

module.exports = router;
