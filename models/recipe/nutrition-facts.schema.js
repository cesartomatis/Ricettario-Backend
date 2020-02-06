const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	},
	valuePerHundred: {
		type: String,
		required: false,
		minlength: 1,
		trim: true,
		unique: false
	},
	valuePerServing: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	}
});
