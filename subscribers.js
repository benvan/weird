var util = require('./util');
var uuid = require('uuid');
var redis = require('ioredis');
var config = require('./config');


var adjectives = util.readLines('resources/short-adjectives');
var animals = util.readLines('resources/safe-animals');

var choose = function(arr){ return util.random(arr).toLowerCase().trim(); };

var createUser = function(){
  var name = 'anon-' + choose(adjectives) + '-' + choose(animals) + '-' + Math.floor(Math.random()*1000);
  var token = 'aut:'+uuid.v4();
  return {
    anonymous:true,
    name: name,
    utoken:token
  };
};

var getOrCreate = function(token){
  return createUser();
};

module.exports = {
  getOrCreate : getOrCreate
};
