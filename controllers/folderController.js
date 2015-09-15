var Folder =  require('../models/folderModel');

exports.postFolder = function (req, res) {

  var folder = new Folder(req.body);
  folder.save( function (err) {
    if (err) {
      res.send(err);
    }else{
      res.json({folder: folder})
    }
  });
  
};

exports.getAllFolder = function (req, res) {
  Folder.find( function (err, folders) {
    if(err){
      res.send(err);
    }else{
    }
    res.json({ folders: folders});
  });
};

exports.getFolder = function (req, res) {
  var id = req.params.folder_id;
  Folder.findById(id, function (err, folder) {
    if (err) {
      res.send(err);
    } else {
      res.json({ folder: folder});
    }
  });
};

exports.updateFolder  = function (req, res) {
  var id = req.params.folder_id;
  Folder.findByIdAndUpdate(id, {$set: req.body}, function (err, folder) {
    if (err) {
      res.send(err);
    } else {
      res.json({ folder: folder});
    }
  });
};

exports.deleteFolder  = function (req, res) {
  var id = req.params.folder_id;
  Folder.findByIdAndRemove(id, {$set: req.body}, function (err, folder) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({
        message: "Folder Deleted successfully."
      });
    }
  });
};
