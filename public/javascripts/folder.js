// serialize _id for Backbone
Backbone.Model.prototype.idAttribute = '_id';

// Folder model
var Folder = Backbone.Model.extend({
  defaults: {
    name: '',
    createdAt: ''
  }
});

// Folder Backbone Collection
var Folders = Backbone.Collection.extend({
  url: 'http://localhost:3000/api/folders'
});

// new folder model
var folders = new Folders();

// view for one folders
var FolderView = Backbone.View.extend({
  model: new Folder(),
  tagName: 'a',
  className: 'collection-item',
  initialize: function () {
    this.template = _.template($('.folders-list-template').html());
  },
  events: {
    'click .edit-folder': 'editFolder',
    'keyup .name-update': 'updateFolder',
    'click .cancel-folder': 'cancelFolder',
    'click .delete-folder': 'deleteFolder',
    'click .folder-item-container': 'fetchRelatedBookmarks'
  },
  editFolder: function () {
    this.$('.edit-folder, .delete-folder').hide();
    this.$('.update-folder, .cancel-folder').show();
    var name = this.$('.name').html();

    this.$('.name').html('<input type="text" class="name-update" value="' + name + '"> ')
  },
  updateFolder: function (e) {
    var name  = $('.name-update').val();
    if(e.which === 13 && name){
      this.model.set('name',name);
      this.model.save(null, {
        success: function (response) {
          console.log('updated '+ response.toJSON()._id);
        },
        error: function () {
          console.log("could not able to delete");
        }
      });
    }
  },
  cancelFolder: function () {
    foldersView.render();
  },
  deleteFolder: function () {
    this.model.destroy({
      success: function (response) {
        console.log('deleted ' + response.toJSON()._id);
      },
      error: function () {
        
        console.log('failed to delete');
      }
    });
  },
  fetchRelatedBookmarks: function () {
    console.log("fetching related bookmarks"); 
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
  
});

// view for all the folders
var FoldersView = Backbone.View.extend({
  model: folders,
  el: $('.folders-list'),
  initialize: function () {
    var self = this;
    this.model.on('add', this.render, this);
    //this.model.on('change', function () {
      //setTimeout(function () {
       //self.render();
      //}, 20)
    //}, this);
    this.model.on('change', this.render, this);
    this.model.on('remove', this.render, this);

    this.model.fetch({
      success: function (response) {
        _.each(response.toJSON(), function (folder) {
        });
      },
      error: function () {
        console.log("Something went wrong, failed to get folders");
      }
    });
  },
  render: function () {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function (folder) {
      self.$el.append(new FolderView({model: folder}).render().$el);
    });
    return this;
  }
});

var foldersView = new FoldersView();

$(document).ready(function () {
  $('#name-input').keyup(function (e) {
    var name = $('#name-input').val();
    if(e.which === 13 && name){
      var folder = new Folder({
        name: name 
      });
      $('#name-input').val('');
      folders.add(folder);
      folder.save(null,{
        success: function (response) {
          console.log('successfully saved the folder'); 
        },
        error: function () {
          console.log("could not save folder");
        }
      });
    }
  })
})
