// routes

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'posts': 'posts',
    'posts/:id': 'post',
    'portfolio': 'portfolio',
    'resume': 'resume'
  }
})

var router = new Router()

router.on('route:home', function(){
  indexView.render()
})

router.on('route:posts', function(){
  postList.render()
})

router.on('route:post', function(id){
  postList.render()
  postView.render(id)
})

router.on('route:portfolio', function(){
  portfolioView.render()
})

router.on('route:resume', function(){
  resumeView.render()
})

// index

var IndexView = Backbone.View.extend({
  el: '.container',
  render: function(){
    var template = _.template($('#index-template').html())
    this.$el.html(template)
  }
})

var indexView = new IndexView()

// portfolio

var PortfolioView = Backbone.View.extend({
  el: '.container',
  render: function(){
    var template = _.template($('#portfolio-template').html())
    this.$el.html(template)
  }
})

var portfolioView = new PortfolioView()

// resume

var ResumeView = Backbone.View.extend({
  el: '.container',
  render: function(){
    var template = _.template($('#resume-template').html())
    this.$el.html(template)
  }
})

var resumeView = new ResumeView()

// posts

var Posts = Backbone.Collection.extend({
  url: '/posts'
})

var Post = Backbone.Model.extend({
  urlRoot: '/posts'
})

var PostList = Backbone.View.extend({
  el:'.container',
  render: function(){
    var that = this
    var posts = new Posts()
    posts.fetch({
      success: function(posts){
        var template = _.template($('#posts-list-template').html(), {posts: posts.models})
        that.$el.html(template)
      }
    })
  }
})

var postList = new PostList()

var PostView = Backbone.View.extend({
  el:'.container',
  render: function(id){
    var that = this
    var post = new Post({id: id})
    post.fetch({
      success: function(post){
        if (post.get('type') == 'quote') {
          var template = _.template($('#quote-template').html(), {post: post})
        }
        else {
          var template = _.template($('#post-template').html(), {post: post})
        }
        that.$el.find('.post').html(template)
      }
    })
  }
})

var postView = new PostView()

Backbone.history.start()
