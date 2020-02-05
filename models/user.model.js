const mongoose = require('mongoose');

const User = mongoose.model(
	'users',
	new mongoose.Schema({
		firstName: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		},
		lastName: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			trim: true,
			unique: true
		},
		password: {
			type: String,
			minlength: 6,
			required: true
		}
	})
);

module.exports = User;
