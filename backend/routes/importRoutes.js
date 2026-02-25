const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middleware/auth');
const { importMembers } = require('../controllers/importController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed.'), false);
    }
  },
});

router.post('/', verifyToken, upload.single('file'), importMembers);

module.exports = router;
