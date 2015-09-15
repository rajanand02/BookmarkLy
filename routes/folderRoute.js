var express = require('express');
var router = express.Router();
var folderController = require('../controllers/folder.js');

router.route('/posts')
  .post(folderController.postFolder)
  .get( folderController.getAllFolder);

module.exports = router;
