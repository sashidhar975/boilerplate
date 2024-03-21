const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const uploads = multer({ 
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("Only JPG and PNG files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB file size limit
  }
});

module.exports = uploads;
