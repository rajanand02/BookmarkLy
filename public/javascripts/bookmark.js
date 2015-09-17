var Bookmark = Backbone.Model.extend({
  defaults: {
    title: '',
    url: '',
    folderId: ''
  }
});


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
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


var BookmarksView = Backbone.View.extend({
  model: bookmarks,
  el: $('.bookmarks-list'),
  initialize: function () {
    var self = this;
    this.model.on('add', this.render, this);
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
