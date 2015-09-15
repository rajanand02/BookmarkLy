var mongoose = require('mongoose');

var validUrl = require('valid-url');

var uniqueValidator = require('mongoose-unique-validator');

var BookmarkSchema = new mongoose.Schema({
  title                : { type: String, required: true },
  url                  : { type: String, required: true, unique: true},
  folderId             : { type: String, ref: 'Folder', required: true, default: 'Home' },
  createdAt            : { type: Date, default: Date.now },
  updatedAt            : { type: Date, default: null }
});

BookmarkSchema.pre('save', function (next) {
  var url = this.url;
  if (validUrl.isUri(url)){
    next();
  } else {
    var err = new Error('Enter a valid url');
    next(err);
  }
});

BookmarkSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Bookmark', BookmarkSchema);


