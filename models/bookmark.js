var mongoose = require('mongoose');

var BookmarkSchema = new mongoose.Schema({
  title                : { type: String, required: true },
  url                  : { type: String, required: true},
  folderId             : { type: String, ref: 'Folder', required: true },
  createdAt            : { type: Date, default: Date.now },
  updatedAt            : { type: Date, default: null },
  deletedAt            : { type: Date, default: null }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);

