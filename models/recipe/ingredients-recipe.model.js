const mongoose = require('mongoose');

const IngredientsRecipe = mongoose.model(
	'ingredients-recipe',
	new mongoose.Schema({
		idIngredient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ingredients',
			required: true,
			unique: false
		},
		idRecipe: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'recipes',
			required: true,
			unique: false
		},
		amount: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		},
		unit: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: false
		}
	})
);

module.exports = IngredientsRecipe;
