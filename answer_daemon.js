var util = require('./util');
var _ = require('lodash');
var Q = require('q');
var config = require('./config');
var Redis = require('ioredis');

var redis = new Redis(config.redis);

var start = function(){
  console.log('listening for answers...');
  run();
};

var process = function(msg){
  Q.fcall(function(){
    var parts = msg.split('\31');
    var args = {
      user: parts[0],
      question: parts[1],
      answer: parts[2]
    };
    return Q.all([
      redis.hincrby(util.tpl('result:q:{{question}}',args), args.answer, 1),
      redis.sadd(util.tpl('answered|{{user}}',args),args.question)
    ]).then(function(){
      console.log('saved '+parts);
    })
  }).fail(function(err){
    console.error('failed to save ',msg,msg.split('\31'),err);
  }).done();
  
};

var run = function(){
  redis.blpop('answers_queue',5).then(function(msg){
    msg && process(msg[1]);
    setTimeout(run,0);
  });
};

start();