var mongoose = require('mongoose');

var FolderSchema = new mongoose.Schema({
  name                 : { type: String, required: true },
  bookmarksCount       : { type: Number, default: 0 }
  createdAt            : { type: Date, default: Date.now },
  updatedAt            : { type: Date, default: null },
  deletedAt            : { type: Date, default: null }
});

module.exports = mongoose.model('Folder', FolderSchema);


