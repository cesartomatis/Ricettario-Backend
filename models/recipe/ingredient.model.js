const mongoose = require('mongoose');

const NutritionFacts = require('./nutrition-facts.schema');

const Ingredient = mongoose.model(
	'ingredients',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		},
		nutritionFacts: {
			type: [NutritionFacts],
			required: true,
			unique: false
		},
		icon: {
			type: String,
			required: false,
			unique: false
		}
	})
);

module.exports = Ingredient;
