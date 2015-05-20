// Backbone Model

var Category = Backbone.Model.extend({
	defaults: {
		title: '# Others',
		link: ''
	}
});
var Categories = Backbone.Collection.extend({});
var categories = new Categories();

var CategoryView = Backbone.View.extend({
	model: new Category(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.category-titles-list-template').html());
	},
	events: {
		'click .edit-category': 'edit',
		'click .update-category': 'update'
		
	},
	edit: function() {
		$('.edit-category').hide();
		$('.delete-category').hide();
		this.$('.update-category').show();
		this.$('.cancel-category').show();

		var title = this.$('.category-title').html();
		var link = this.$('.link').html();

		this.$('.category-title').html('<input type="text" class="form-control category-title-update" value="' + title + '">');
		this.$('.link').html('<input type="text" class="form-control link-update" value="' + link + '">');
	},
	update: function() {
		this.model.set('category-title', $('.category-title-update').val());
		this.model.set('link', $('.link-update').val());
	},
	cancel: function() {
		categoriesView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()))
		return this;
	}
});

var CategoriesView = Backbone.View.extend({
	model: categories,
	el: $('.category-titles-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		}, this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(title) {
			self.$el.append((new CategoryView({model: title})).render().$el);
		});
		return this;
	}
});
var categoriesView = new CategoriesView();

$(document).ready(function() {
	$('.add-category').on('click', function() {
		var category = new Category({
			title: $('.category-title-input').val(),
			link: $('.link-input').val()
		});
		$('.category-title-input').val('');
		$('.link-input').val('');
		console.log(category.toJSON());
		categories.add(category);
	})
})