const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	idIngredient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ingredients',
		required: true,
		unique: false
	},
	amount: {
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
