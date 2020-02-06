const mongoose = require('mongoose');

const NutritionFactValue = require('./nutrition-facts-values.schema');

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	},
	valuePerHundred: {
		type: NutritionFactValue,
		required: false,
		unique: false
	},
	valuePerServing: {
		type: NutritionFactValue,
		required: true,
		unique: false
	}
});
