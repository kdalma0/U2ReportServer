const fs = require('fs')
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, __basedir + '/uploads/' + req.params.group + '/' + req.params.testcase + '/' + req.params.seq + '/');
    },
  filename: (req, file, callback) => {
      callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

module.exports = upload;
