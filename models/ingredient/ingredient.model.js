const mongoose = require('mongoose');

const NutritionFacts = require('../nutrition-facts/nutrition-facts.schema');
const Quantity = require('./quantity.model');

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	},
	nutritionFacts: {
		type: [NutritionFacts],
		required: false,
		unique: false
	},
	caloriesPerServing: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: false
	},
	quantity: {
		type: [Quantity],
		required: true,
		unique: false
	}
});
