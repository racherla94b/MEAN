const express = require("express");
var router = express.Router();

const checkAuth = require("../middleware/auth-check");
const extractFile = require("../middleware/file");

const WordController = require('../controllers/dublinwords');
const DocumentsController = require('../controllers/uploaddocs');

router.get("/defWord", WordController.getWords);

router.get("/defWord/:id", WordController.getWord);

router.post("/defWord", checkAuth, WordController.createWord);

router.put("/defWord/:id", checkAuth, WordController.updateWord);

router.delete("/defWord/:id", checkAuth, WordController.deleteWord);

router.post("/addFile", checkAuth, extractFile, DocumentsController.addDoc);

module.exports = router;
