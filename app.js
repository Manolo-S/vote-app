var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');//TODO bekijk
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/voteapp');
var pollData;
var Schema = mongoose.Schema; 
var pollData;
var pollName;
var categories;
var scores;

function pollItemsFun(pollItem) {
    return pollItem;
}

var PollItemSchema = new Schema({
    categorie: String,
    votes: Number,
    _id: false
});
var PollSchema = new Schema({
    pollName: String,
    pollItems: [PollItemSchema]
});
var pollModel = mongoose.model('polls', PollSchema);
var data = [{
    pollName: 'Who would you vote for?',
    pollItems: [{
        categorie: 'Trump',
        votes: 45
    }, {
        categorie: 'Rubio',
        votes: 20
    }, {
        categorie: 'Cruz',
        votes: 22
    }, {
        categorie: 'Hillary',
        votes: 52
    }, {
        categorie: 'Sanders',
        votes: 48
    }]
}];

pollModel.create({
    pollName: data[0].pollName,
    pollItems: data[0].pollItems.map(pollItemsFun)
        }, function(err, polls) {
        if (!err) {
                pollData = {"pollData": polls};
                console.log(pollData);

             console.log('saved polldata');
           
            } else {console.log(err)}});



var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
// var data = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'})); //TODO bekijk

require('./config/passport')(app);  //TODO bekijk

// app.use('/data', data);
app.use('/data/polldata', function(req,res,next){ //TODO data functies in
  if (mongoose.connection.readyState = 0){        //apart bestand als het lukt
    var db = mongoose.connect('mongodb://localhost/voteapp');
  }

    console.log('data.js router.use called');

    pollModel.find({}, function(err, polls) {
                console.log('retrieved data');
                pollData = {"pollData": polls};
                console.log(pollData);

                mongoose.connection.close(function() {
                    console.log(
                        'Mongoose connection disconnected'
                    );
                });
                 next();
            });

});

app.get('/data/polldata', function(req, res) {
    res.json(pollData);    //TODO process array with multiple polls in
                           //pollStorage.js
});

app.use('/create-poll', function(req, res, next){
  if (mongoose.connection.readyState = 0){        //apart bestand als het lukt
      var db = mongoose.connect('mongodb://localhost/voteapp');
    }

  pollModel.find({}, function(err, polls) {
                console.log('retrieved data');
                pollData = {"pollData": polls};
                console.log(pollData);

                mongoose.connection.close(function() {
                    console.log(
                        'Mongoose connection disconnected'
                    );
                });
                 next();
            });
})

app.get('/create-poll', function(req, res){
  res.render('createPoll.ejs');
});

function createpollItems(categorie){
  return {categorie: categorie, votes: 5};
}

function storePolls(dataArr){
  console.log(dataArr);
    var categoriesArr = (String(dataArr.slice(2))).split(",");
    console.log('categoriesArr', categoriesArr);
      pollModel.create({
          pollName: dataArr[1],
          pollItems: categoriesArr.map(createpollItems)
              }, function(err, polls) {
              if (!err) {
                      pollData = {"pollData": polls};
                      console.log('saved polldata', pollData);
      } else {console.log(err)}});
}

app.post('/store-in-db', function(req, res){
  var dataArr = req.body.pollData;

  dataArr.map(storePolls);
});


app.use('/', index);

app.use('/users', users);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
