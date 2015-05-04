var express = require('express');
var app = express();
var Q = require('q');

//todo
//don't promise.then(req.json) - leaves hanging connections on failure

var questions = require('./questions');
var subscribers = require('./subscribers');

app.use(require('express-promise')());
app.use(express.static(__dirname+'/client'));

app.post('/subscriber', function(req,res){
  var token = req.query['utoken'];
  var user = subscribers.getOrCreate(token);
  res.json(user);
});

app.get('/question/next', function(req, res) {
  console.log('here');
  var utoken = req.query['utoken'];
  var qtoken = req.query['qtoken']; // for now... just sequential
  res.json(questions.next(utoken,qtoken));
});

app.get('/question/:id', function(req,res){
  questions.getQuestion(req.params['id']).then(res.json);
});

app.get('/question/:id/result', function(req,res){
  var q = req.params['id'];
  questions.getResult(q).then(res.json);
});

app.post('/question/:qid/result/:aid', function(req,res){
  var token = req.query['utoken'];
  var question = req.params['qid'];
  var answer = req.params['aid'];
  questions.answer(token,question,answer).then(function(){
    res.send('ok');
  })
});


app.listen(9000);
