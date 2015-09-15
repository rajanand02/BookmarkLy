
var express = require('express');
var router = express.Router();
var bookmarkController = require('../controllers/bookmarkController');

router.route('/bookmarks')
  .post(bookmarkController.postBookmark)
  .get( bookmarkController.getAllBookmark);


router.route('/bookmarks/:bookmark_id')
  .get(bookmarkController.getOneBookmark)
  .put(bookmarkController.updateBookmark)
  .delete(bookmarkController.deleteBookmark);

module.exports = router;
