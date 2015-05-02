var express = require('express');
var app = express();
var Q = require('q');
var fs = require('fs');

app.use(require('express-promise')());
app.use(express.static(__dirname));

var random = function(arr){
  return arr[Math.floor(Math.random()*arr.length)]
};

var buildQuestions = function(){
  var text = fs.readFileSync('questions').toString();
  var lines = text.split('\n');
  var makeQuestion = function(line){
    var pieces = line.split('|').map(function(x){ return x.trim() });
    return {
      question:pieces[0],
      options:pieces.slice(1)
    };
  };
  return lines.map(makeQuestion); 
};

var questions = buildQuestions();

app.get('/next', function(req, res) {
  res.json(random(questions));
});

app.listen(9000);
