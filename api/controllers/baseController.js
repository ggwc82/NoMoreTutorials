'use strict';

var mongoose = require('mongoose');
var Location = mongoose.model('Location');

exports.list_all_locations = function(req, res) {
	Location.find({}, function(err, loc) {
		if (err)
			res.send(err);
		res.json(loc);
	});
};

exports.create_a_location = function(req, res) {
	var new_location = new Location(req.body);
	new_location.save(function(err, loc) {
		if (err)
			res.send(err);
		res.json(loc);
	});
};

exports.latest_datapoint = function(req, res) {
	Location.findOne().sort( {_id: 'desc'} ).exec( function(err, loc) {
		if (err)
			res.send(err);
		res.json(loc);
	});
}