const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ////console.log(file);
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
////console.log(upload);
module.exports = upload;
