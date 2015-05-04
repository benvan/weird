var fs = require('fs');

module.exports = {
  random: function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
  },
  readLines: function(filename){
    var text = fs.readFileSync(filename).toString();
    return text.split('\n');
  }
};