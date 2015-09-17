// Folder model
var Folder = Backbone.Model.extend({
  defaults: {
    name: '',
    createdAt: ''
  }
});

var Folders = Backbone.Collection.extend({
  url: 'http://localhost:3000/api/folders'
});

//var folder1 = new Folder({
  //name: 'documents',
  //createdAt: 'sep 10'
//});

//var folder2 = new Folder({
  //name: 'downloads',
  //createdAt: 'sep 12'
//});


var folders = new Folders();

// view for one folders
var FolderView = Backbone.View.extend({
  model: new Folder(),
  tagName: 'li',
  initialize: function () {
    this.template = _.template($('.folders-list-template').html());
  },
  events: {
    'click .edit-folder': 'editFolder',
    'click .update-folder': 'updateFolder',
    'click .cancel-folder': 'cancelFolder',
    'click .delete-folder': 'deleteFolder'
  },
  editFolder: function () {
    this.$('.edit-folder, .delete-folder').hide();
    this.$('.update-folder, .cancel-folder').show();
    var name = this.$('.name').html();

    this.$('.name').html('<input type="text" class="name-update" value="' + name + '"> ')
  },
  updateFolder: function () {
    this.model.set('name', $('.name-update').val());
  },
  cancelFolder: function () {
    foldersView.render();
  },
  deleteFolder: function () {
    this.model.destroy();
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
    this.model.on('change', function () {
      setTimeout(function () {
       self.render();
      }, 20)
    }, this);
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
  $('.add-folder').on('click', function () {
    var folder = new Folder({
      name: $('#name-input').val()
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
  });

})