'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	tag_id: {
		type: String,
		default: "Freddy"
	},
	Created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['stationary', 'moving', 'unknown']
		}],
		default:['unknown']
	},
	x_coord: {
		type: Number,
		default: 0
	},
	y_coord: {
		type: Number,
		default: 0
	},
	z_coord: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Location', LocationSchema);