const multer = require("multer");

const MIME_TYPE_MAP = {
  "application/json": "json",
  "text/xml": "xml",
  "application/xml": "xml",
  "text/csv": "csv",
  "application/vnd.ms-excel": "csv",
  "text/plain": "plain",
  "application/pdf": "pdf"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file.mimetype);
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

module.exports = multer({ storage: storage }).single("file");
