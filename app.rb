require 'rubygems'
require 'sinatra'
require 'json'
require 'rest-client'

get '/' do
  haml :index
end

get '/posts' do
  response = RestClient.get('http://api.tumblr.com/v2/blog/kevin-buchanan.tumblr.com/posts?api_key=' + ENV['API_KEY']) rescue {}
  JSON.parse(response)['response']['posts'].to_json rescue {}.to_json
end

get '/posts/:id' do
  response = RestClient.get('http://api.tumblr.com/v2/blog/kevin-buchanan.tumblr.com/posts?api_key=' + ENV['API_KEY'] + '&id=' + params[:id]) rescue {}
  JSON.parse(response)['response']['posts'][0].to_json rescue {}.to_json
end
