var Bookmark =  require('../models/bookmarkModel');

exports.postBookmark = function (req, res) {

  var bookmark = new Bookmark(req.body);
  bookmark.save( function (err) {
    if (err) {
      res.send(err);
    }else{
      res.json(bookmark);
    }
  });
  
};

//exports.getAllBookmark = function (req, res) {
  //Bookmark.find( function (err, bookmarks) {
    //if(err){
      //res.send(err);
    //}else{
    //}
    //res.json({ bookmarks: bookmarks});
  //});
//};

exports.getOneBookmark = function (req, res) {
  var id = req.params.bookmark_id;
  Bookmark.findById(id, function (err, bookmark) {
    if (err) {
      res.send(err);
    } else {
      res.json({ bookmark: bookmark});
    }
  });
};

exports.updateBookmark  = function (req, res) {
  var id = req.params.bookmark_id;
  var data = req.body;
  data.updatedAt = Date.now();
  Bookmark.findByIdAndUpdate(id, {$set: data}, function (err, bookmark) {
    if (err) {
      res.send(err);
    } else {
      res.json({ bookmark: bookmark});
    }
  });
};

exports.deleteBookmark  = function (req, res) {
  var id = req.params.bookmark_id;
  Bookmark.findByIdAndRemove(id, {$set: req.body}, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({
        message: "Bookmark Deleted successfully."
      });
    }
  });
};
exports.getDefaultBookmarks = function (req, res) {
  Bookmark.find({folderId: "12345678"}, function (err, bookmarks) {
    if(err){
      res.send(err);
    }else{
    }
    res.json(bookmarks);
  });
};
