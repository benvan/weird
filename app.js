var express = require('express');
var app = express();

app.use(require('express-promise')());

app.use(express.static(__dirname));

app.get('/foo', function(req, res) {
  res.json({
    result: 'ok'
  });
});

app.listen(9000);
