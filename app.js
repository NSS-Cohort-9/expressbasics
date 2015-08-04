var fs = require('fs');

var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');

var routes = require('./routes/index');
var pizza = require('./routes/pizza');

var app = express();

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'aweso.me';

app.use(lessCSS('public'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/', routes);
app.use('/pizza', pizza);

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  // pass 4 arguments to create an error handling middleware
  console.log('ERRRRRRRRRR', err.stack);
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});
