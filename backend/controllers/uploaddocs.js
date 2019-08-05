var UploadFile = require("../models/upload");
var User = require("../models/user");

exports.addDoc = (req, res, next) => {
  User.findById(req.userData.id, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(500).json({
        title: 'Cannot find User'
      });
    }

    const url = req.protocol + "://" + req.get("host");
    const uploadFile = new UploadFile ({
      filePath: "/ec-project/backend/uploads/" + req.file.filename,
      fileName: req.body.filename,
      fileExt: req.body.fileExt,
      userId:  req.userData.id,
      username: req.userData.name
    });

    uploadFile.save(function(err, result) {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error in Uploading. Please try again later'
        });
      }
      user.fileEntries.push(result._id);
      user.save();
      res.status(201).json({
        message: "File Upload successful"
      });
    });
  });
}
