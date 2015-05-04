var fs = require('fs');

module.exports = {
  random: function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
  },
  readLines: function(filename){
    var text = fs.readFileSync(filename).toString();
    return text.split('\n');
  },
  tpl: function(string,values){
    return Object.keys(values).reduce(function(acc,key){
      return acc.replace('{{'+key+'}}',values[key]);
    },string);
  }
};