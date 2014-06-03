var express = require('express');
var dbConnect = require('./db/db-config.js');
var userHandler = require('./server/userHandler.js');
var busHandler = require('./server/busHandler.js');
var authen = require('./server/authenHelpers.js');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
  app.use(express.bodyParser());
  app.use(allowCrossDomain);
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

// public user routes
app.post('/login/user', userHandler.login);
app.get('/logout', authen.logout);

// public business routes
app.post('/login/business', busHandler.login);
app.post('/signup/business', busHandler.signup);

// private user routes
app.get('/requests', userHandler.sendRequestInfo);
app.post('/requests/accept', userHandler.acceptOffer);
app.post('/requests/reject', userHandler.rejectOffer);
app.post('/acceptOffer', authen.userAuthenticate, userHandler.acceptOffer);
app.post('/request', authen.authenticateUserToken, userHandler.request);
app.post('/token', userHandler.registerToken);

// private business routes
app.get('/business/requests', busHandler.showRequests);
app.post('/business/requests/decline', busHandler.declineRequests);
app.post('/business/requests/accept', busHandler.acceptRequests);
app.get('/business/offered', busHandler.showOffered);
app.get('/business/accepted', busHandler.showAccepted);
app.post('/business/token', busHandler.registerToken);

module.exports = app;
