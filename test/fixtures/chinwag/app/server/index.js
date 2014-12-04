var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(app.get('port'), function() {
  console.info('Marty Devtools Fiture started on port ' + server.address().port);
});