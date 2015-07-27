var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('./lib/util');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.get('/test', function(request, response) {
  response.send('cool');
});

app.head('/callback', function (req, res) {
  res.send('You get the trello callback');
});
app.post('/callback', function (req, res) {
  var action = req.body.action;
  var card = action.data.card;
  var actions = [
    'createCard',
    'updateCard'
  ];

  var shouldUpdateName = actions.indexOf(action.type) !== -1;
  if (shouldUpdateName) {
    this.body = util.updateName(card);
  }

  res.send('OK');
});

app.get('/', function (req, res) {
  res.send('Trello Webhook Server');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
