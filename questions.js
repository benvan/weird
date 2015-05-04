var util = require('./util');

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
  return lines.map(makeQuestion).filter(function(x){ return x.question.length > 0});
};

var questions = buildQuestions();

var next = function(utoken,qtoken){
  var index = ((parseInt(qtoken) + 1) || 0)%questions.length;
  return questions[index];
};

module.exports = {
  questions : questions,
  next : next
};