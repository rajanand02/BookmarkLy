var Folder =  require('../models/folder');

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
  })
};
