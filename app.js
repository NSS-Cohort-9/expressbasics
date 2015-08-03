var express = require('express');
var app = express();

app.use(express.static('public'));

app.post('/', function (req, res) {
  res.send('Hello World!');
});

app.get(/hello/, function (req, res) {
  res.send('Hello!');
});

app.get('/world', function (req, res) {
  res.send('World!');
});

app.get('/test', function (req, res) {
  res.send('Test1!');
});

app.get('/test', function (req, res) {
  res.send('Test2!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});
