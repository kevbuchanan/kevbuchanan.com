require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'rest-client'

get '/' do
  haml :index
end

get '/posts' do
  response = RestClient.get('http://api.tumblr.com/v2/blog/kevin-buchanan.tumblr.com/posts?api_key=D8ctoNXUihRiIyRnMCQ38S5fSgwep28EGzAZQnMPe3FfV3U3kB') rescue {}
  JSON.parse(response)['response']['posts'].to_json rescue {}.to_json
end

get '/posts/:id' do
  response = RestClient.get('http://api.tumblr.com/v2/blog/kevin-buchanan.tumblr.com/posts?api_key=D8ctoNXUihRiIyRnMCQ38S5fSgwep28EGzAZQnMPe3FfV3U3kB&id=' + params[:id]) rescue {}
  JSON.parse(response)['response']['posts'][0].to_json rescue {}.to_json
end
