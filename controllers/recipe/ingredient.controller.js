const router = require('express').Router();

const ingredientValidations = require('../../middlewares/validations/recipe/ingredient.validations');
const authorize = require('../../middlewares/authorize');

const Ingredient = require('../../models/recipe/ingredient.model');

router.post(
	'/add',
	[authorize, ingredientValidations.addIngredient],
	async (req, res) => {
		try {
			const ingredientToAdd = new Ingredient({
				name: req.body.name,
				nutritionFacts: req.body.nutritionFacts,
				icon: req.body.icon
			});
			await ingredientToAdd.save();
			return responseHandler.handleOKResponse(res, {
				message: 'INGREDIENT_ADDED',
				name: ingredientToAdd.name
			});
		} catch (err) {
			return responseHandler.handleUnexpectedError(res, {
				message: 'ADD_INGREDIENT_ERROR',
				error: err
			});
		}
	}
);

module.exports = router;
