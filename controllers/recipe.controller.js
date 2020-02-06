const router = require('express').Router();
const moment = require('moment');

const authorize = require('../middlewares/authorize');
const responseHandler = require('../helpers/response.helper');
const recipeValidations = require('../middlewares/validations/recipe.validations');

const Recipe = require('../models/recipe/recipe.model');

router.post(
	'/add',
	[authorize, recipeValidations.addOrUpdateRecipe],
	async (req, res) => {
		try {
			const creationTime = moment().format('x');
			const recipeToAdd = new Recipe({
				isPublic: req.body.isPublic,
				createdBy: req.body.createdBy,
				createdIn: creationTime,
				editedIn: creationTime,
				title: req.body.title,
				ingredients: req.body.ingredients,
				directions: req.body.directions,
				tips: req.body.tips,
				nutritionFacts: req.body.nutritionFacts,
				photo: req.body.photo
			});
			await recipeToAdd.save();
			return responseHandler.handleOKResponse(res, {
				message: 'RECIPE_ADDED',
				name: recipeToAdd.title
			});
		} catch (err) {
			return responseHandler.handleUnexpectedError(res, {
				message: 'ADD_RECIPE_ERROR',
				error: err
			});
		}
	}
);

module.exports = router;
