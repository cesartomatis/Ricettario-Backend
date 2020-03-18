const mongoose = require('mongoose');

const Ingredients = require('../ingredient/ingredient.model');
const NutritionFacts = require('../nutrition-facts/nutrition-facts.schema');

const Recipe = mongoose.model(
	'recipes',
	new mongoose.Schema({
		isPublic: {
			type: Boolean,
			default: true,
			required: true,
			unique: false
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true,
			unique: false
		},
		createdIn: {
			type: Number,
			required: true,
			unique: false
		},
		editedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: false,
			unique: false
		},
		editedIn: {
			type: Number,
			required: false,
			unique: false
		},
		title: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		},
		ingredients: {
			type: [Ingredients],
			required: true,
			unique: false
		},
		directions: {
			type: [String],
			required: true,
			unique: false
		},
		tips: {
			type: String,
			required: false,
			unique: false
		},
		nutritionFacts: {
			type: [NutritionFacts],
			required: true,
			unique: false
		},
		preparationTime: {
			type: Number,
			required: true,
			unique: false
		},
		cookingTime: {
			type: Number,
			required: true,
			unique: false
		},
		readyIn: {
			type: Number,
			required: true,
			unique: false
		},
		difficulty: {
			type: String,
			required: true,
			unique: false
		},
		servings: {
			type: Number,
			required: true,
			unique: false
		},
		photo: {
			type: String,
			required: false,
			unique: false
		}
	})
);

module.exports = Recipe;
