var express = require('express');

var dotenv = require('dotenv');
dotenv.config();
var url = process.env.MONGOATLAS_URI;

var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Location = require('./api/models/baseModel');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/baseRoutes');
routes(app);

app.listen(port);

// handles the 404 error if routes not defined
app.use(function(req, res) {
	res.status(404).send({url: req.orginalUrl + ' not found'})
});

console.log('basic express app serving on ' + port);