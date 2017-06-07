'use strict';

module.exports = function(app) {
	var base = require('../controllers/baseController');


	app.route('/locations')
		.get(base.list_all_locations)
		.post(base.create_a_location);

}