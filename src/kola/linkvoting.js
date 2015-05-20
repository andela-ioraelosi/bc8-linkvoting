// Backbone Model

var Category = Backbone.Model.extend({
	defaults: {
		hashtagCategory: 'Others',
		title: '',
		link: ''
	}
});
var Categorys = Backbone.Collection.extend({});

var CategoryView = Backbone.View.extend({
	model: new Category(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.categorys-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()))
	}
});

var CategorysView = Backbone.View.extend({
	model: Categorys,
	el: $('.categorys-list'),
	initialize: function() {
		this.model.on('add', this.render(), this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(category) {
			self.$el.append((new CategoryView({model: category})).render().$el);
		});
	}
});