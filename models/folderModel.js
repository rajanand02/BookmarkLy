var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var FolderSchema = new mongoose.Schema({
  name                 : { type: String, required: true, unique: true },
  bookmarksCount       : { type: Number, default: 0 },
  createdAt            : { type: Date, default: Date.now },
  updatedAt            : { type: Date, default: null }
});

FolderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Folder', FolderSchema);


