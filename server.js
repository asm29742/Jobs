var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

// Parsing requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose (MongoDB) Connection
var connection = mongoose.connect('mongodb://localhost:27017/jobs');
mongoose.connection.on('error', function(err) {
    console.log('Mongo DB is not started!');
});

// Schema reference
app.schema = {};
require('./models.js')(app, mongoose);

// Data Access Layer reference
app.crud = require('./dal/crud.js');


// API Router reference
require('./apiRoutes.js')(app);


// Start Server
app.listen('3000', function() {
    console.log('Server is running - PORT: 3000');
});