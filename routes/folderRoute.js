var express = require('express');
var router = express.Router();
var folderController = require('../controllers/folderController');

router.route('/folders')
  .post(folderController.postFolder)
  .get( folderController.getAllFolder);


router.route('/folders/:folder_id')
  .get(folderController.getFolder)
  .put(folderController.updateFolder)
  .delete(folderController.deleteFolder);

module.exports = router;
