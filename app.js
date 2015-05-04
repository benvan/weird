var express = require('express');
var app = express();
var Q = require('q');

var questions = require('./questions');
var subscribers = require('./subscribers');

app.use(require('express-promise')());
app.use(express.static(__dirname+'/client'));

app.post('/subscriber', function(req,res){
  var token = req.param('utoken');
  var user = subscribers.getOrCreate(token);
  res.json(user);
});

app.get('/next', function(req, res) {
  var utoken = req.param('utoken');
  var qtoken = req.param('qtoken'); // for now... just sequential
  res.json(questions.next(utoken,qtoken));
});

app.listen(9000);
