var util = require('./util');
var _ = require('lodash');
var config = require('./config');
var Redis = require('ioredis');
var Q = require('q');

var redis = new Redis(config.redis);

var buildQuestions = function(){
  var lines = util.readLines('resources/questions');
  var makeQuestion = function(line,index){
    var pieces = line.split('|').map(function(x){ return x.trim() });
    return {
      id: index,
      question:pieces[0],
      options:pieces.slice(1)
    };
  };
  return _.shuffle(lines).map(makeQuestion).filter(function(x){ return x.question.length > 0});
};

var questions = buildQuestions();

var next = function(utoken,qtoken){
  var index = ((parseInt(qtoken) + 1) || 0)%questions.length;
  return questions[index];
};

var sep = "\31";
var answer = function(utoken,question,answer){
  var key = [utoken,question,answer].join(sep);
  return redis.rpush('answers_queue',key);
};

var getQuestion = function(id){
  return questions.length > id ? Q.resolve(questions[id]) : Q.reject('not found');
};

var getResult = function(qid){
  return redis.hgetall('result:q:'+qid)
    .then(function(values){
      return getQuestion(qid).then(function(q){
        return _.extend({},q,{
          options:q.options.map(function(a,i){
            return { answer: a, count: parseInt(values[i]) || 0}
          }) 
        }); 
      });
  });
};

module.exports = {
  questions : questions,
  answer : answer,
  getResult: getResult,
  getQuestion : getQuestion,
  next : next
};