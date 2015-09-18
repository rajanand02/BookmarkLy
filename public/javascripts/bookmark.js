var Bookmark = Backbone.Model.extend({
  defaults: {
    title: '',
    url: '',
    folderId: currentFolderId,
    updatedAt: '',
    createdAt: ''
  }
});
templateHelpers: {
   moment: moment 
}

var Bookmarks = Backbone.Collection.extend({
  url: 'http://localhost:3000/api/bookmarks'
});

var bookmarks = new Bookmarks();

var BookmarkView = Backbone.View.extend({
  model: new Bookmark(),
  tagName: 'a',
  className: 'abcd',
  initialize: function () {
    this.template = _.template($('.bookmarks-list-template').html());
  },
  events: {
    'click .edit-bookmark': 'editBookmark',
    'click .update-bookmark': 'updateBookmark',
    'click .cancel-bookmark': 'cancelBookmark',
    'click .delete-bookmark': 'deleteBookmark',
    'click .url-update': 'preventUrl'
  },
  editBookmark: function () {
    this.$('.edit-bookmark, .delete-bookmark').hide();
    this.$('.update-bookmark, .cancel-bookmark').show();
    var title = this.$('.bookmark-title').text().trim();
    var url = this.$('.bookmark-url').text().trim();
    this.$('.bookmark-title').html('<input type="text" class="title-update" value="' + title + '"> ');
    this.$('.bookmark-url').html('<input type="text" class="url-update" value="' + url + '"> ');
    this.$('.title-update').focus();
  },
  cancelBookmark: function () {
    bookmarksView.render();
  },
  deleteBookmark: function () {
    this.model.destroy({
      success: function (response) {
        console.log('deleted ' + response.toJSON()._id);
      },
      error: function () {

        console.log('failed to delete');
      }
    });
  },
  updateBookmark: function () {
    var title = this.$('.title-update').val().trim();
    var url = this.$('.url-update').val().trim();
    var time = Date.now();
    this.model.set('title', title);
    this.model.set('url', url);
    this.model.set('updatedAt', time);
    this.model.save(null,{
      success: function (response) {
        console.log('updated bookmark '+ response.toJSON()._id);
      },
      error: function () {
        console.log("Failed to udpate bookmark");
      }
    });
  },
  preventUrl: function (e) {
    e.preventDefault ();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


var BookmarksView = Backbone.View.extend({
  model: bookmarks,
  el: $('.bookmarks-list'),
  initialize: function (options) {
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function () {
      setTimeout(function () {
        self.render();
      }, 20)
    }, this);
    this.model.on('remove', this.render, this);
    this.model.fetch({
      success: function (response) {
        _.each(response.toJSON(), function (bookmark) {
        });
      },
      error: function () {
        console.log("Failed to fetch default bookmarks");
      }
    });
  },
  render: function () {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function (bookmark) {
      self.$el.append(new BookmarkView({model: bookmark}).render().$el);
    });
    return this;
  }
});

var bookmarksView = new BookmarksView();

$(document).ready(function () {
  $('#bookmarkForm').submit(function (e) {
    e.preventDefault();
    var title = $('#title').val().trim();
    var url = $('#url').val().trim();

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(title && url){
      if(url.match(regex)){
        var bookmark = new Bookmark({
          title: title,
          url: url,
          updatedAt: Date.now(),
          createdAt: Date.now(),
          folderId: currentFolderId
        });
        $('#bookmarkForm')[0].reset();
        bookmarks.add(bookmark);
        bookmark.save(null,{
          sucesss: function (response) {
            console.log('successfully created a bookmark');
          },
          error: function () {
            console.log('failed to create a bookmark');
          }
        });
      }else{
        alert('Enter a valid url');
      }
    }else{
      alert('Title or URL may not be empty');
    }
  });
});
