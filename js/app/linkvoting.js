// Backbone Model

var LinK = Backbone.Model.extend({
	defaults: {
		url: 'Others',
		category: ''
	}
});
var Links = Backbone.Firebase.Collection.extend({
	model: LinK,
  	url: 'https://fiery-fire-819.firebaseio.com/Link'
});
var links = new Links();


var LinkView = Backbone.View.extend({
	model: new LinK(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.link-titles-list-template').html());
	},
	events: {
		'click .edit-link': 'edit',
		'click .update-link': 'update',
		'click .delete-link': 'delete',
		'click .cancel': 'cancel'
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
		this.model.set('link-title', $('.link-title-update').val());
		this.model.set('category', $('.category-update').val());

	},
	cancel: function() {
		linksView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()))
		return this;
	}
});


var LinksView = Backbone.View.extend({
	model: links,
	el: $('.link-titles-list'),
	initialize: function() {
		var self = this;
		this.listenTo(this.model, "add", this.render);
		
		this.listenTo(this.model, "change", function() {
			setTimeout(function() {
				self.render();
			}, 30);
		});
		this.listenTo(this.model, "remove", this.render);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(link) {
			self.$el.append((new LinkView({model: link})).render().$el);
		});
		return this;
	}
});
var linksView = new LinksView();

$(document).ready(function() {
	$('.add-link').on('click', function() {
		var link = new LinK({
			url: $('.link-title-input').val(),
			category: $('.category-input').val()
		});
		$('.link-title-input').val('');
		$('.category-input').val('');
		links.add(link);
	})
})