

$(document).ready(function() {
	// Backbone Model

var LinK = Backbone.Model.extend({
	defaults: {
		url: '',
		category: 'Others',
		voteup: 0,
		votedown: 0

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
		'click .voteup': 'vote',
		'click .votedown': 'votedown',
		'click .delete-link': 'deleteLink',
		'click .cancel': 'cancel'
	},

	initialize: function() {
			
    	this.template = _.template($('.link-titles-list-template').html());

    	/*this.listenTo(this.model, 'add', this.edit);
    	this.listenTo(this.model, 'add', this.update);
    	this.listenTo(this.model, 'add', this.cancel);
    	this.listenTo(this.model, 'add', this.deleteLink);*/
    },
	
	vote: function() {
	
  this.model.set('voteup', $('.voteup').val()++);
	},
	votedown: function() {
		this.model.set('votedown', $('.link-title-update').val()++);
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
			url: $('.link-title-input').val(),
			category: $('.category-input').val()
		});
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

var linksView1 = new LinksView();
});

/*$(var HackappView = Backbone.View.extend({

  el: '#container2',
  template: _.template("<li><a href='<%= b %>'><%= a %></a></li>"),

  initialize: function(){
    this.render();
  },
  render: function(){
    var a= [1,4,5,6,6,7,3,4,5,5];
    var i= 0;
    for(var b in a){
    this.$el.append(this.template({a: a[b], b: b }));
    }
  }

}))*/