

$(document).ready(function() {
	// Backbone Model

var LinK = Backbone.Model.extend({
	defaults: {
		url: '',
		category: ''
	}
});
var Links = Backbone.Firebase.Collection.extend({
	model: LinK,
  	url: 'https://fiery-fire-819.firebaseio.com/Link'
});
var links = new Links();


var LinkView = Backbone.View.extend({
	tagName: 'tr',
	events: {
		'click .edit-link': 'edit',
		'click .update-link': 'update',
		'click .delete-link': 'deleteLink',
		'click .cancel': 'cancel'
	},

	initialize: function() {
    	this.template = _.template($('.link-titles-list-template').html());
    },
	
	edit: function() {
		$('.edit-link').hide();
		$('.delete-link').hide();
		this.$('.update-link').show();
		this.$('.cancel').show();

		var url = this.$('.link-title').html();
		var category = this.$('.category').html();

		this.$('.link-title').html('<input type="text" class="form-control link-title-update" value="' + url + '">');
		this.$('.category').html('<input type="text" class="form-control category-update" value="' + category + '">');
	},
	update: function() {
		this.model.set('url', $('.link-title-update').val());
		this.model.set('category', $('.category-update').val());
		$('.edit-link').show();
		$('.delete-link').show();
		$('.update-link').hide();
		$('.cancel').hide();

	},
	cancel: function() {
		linksView.render();
	},
	deleteLink: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var LinksView = Backbone.View.extend({
	el: $('#link-vote-app'),
	events: {
		'click #add-link': 'createLink'
	},

	initialize: function() {
		this.listenTo(links, 'add', this.addOne);
		// this.model.on('change', this.render, this);
	},

	addOne: function(link) {
		var view = new LinkView({model: link});
		this.$('.link-titles-list').append(view.render().el);
	},

	createLink: function () {
		links.create({
			/*if ($('.link-title-input').val() == "" && $('.category-input').val() == "")
				alert("Url can't be empty!!!");
			else if ($('.category-input').val() == "") {
				url: $('.link-title-input').val(),
				category: "Others"
			}
			else {
				url: $('.link-title-input').val(),
				category: $('.category-input').val()
			}
			
		});*/
		url: $('.link-title-input').val(),
		category: $('.category-input').val()
		})
		$('.link-title-input').val('');
		$('.category-input').val('');
	},

	render: function() {
		var self = this;
		this.$el.html('');
		_.each(links.toArray(), function(link) {
			self.$el.append((new LinkView({model: link})).render().$el);
		});
		return this;
	}
});

var linksView = new LinksView();
});
