const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	value: {
		type: Number,
		required: true,
		unique: false
	},
	unit: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	}
});
