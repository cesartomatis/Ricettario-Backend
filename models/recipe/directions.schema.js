const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	preparationTime: {
		type: Number,
		required: true,
		unique: false
	},
	cookTime: {
		type: Number,
		required: true,
		unique: false
	},
	readyIn: {
		type: Number,
		required: true,
		unique: false
	},
	steps: {
		type: [String],
		required: true,
		unique: false
	}
});
