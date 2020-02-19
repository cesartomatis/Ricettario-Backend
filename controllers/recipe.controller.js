const router = require('express').Router();
const moment = require('moment');

const authorize = require('../middlewares/authorize');
const responseHandler = require('../helpers/response.helper');
const recipeValidations = require('../middlewares/validations/recipe.validations');
const { setUsersNames } = require('../helpers/recipe.helper');

const Recipe = require('../models/recipe/recipe.model');
const User = require('../models/user.model');

router.post(
	'/add',
	[authorize, recipeValidations.addOrUpdateRecipe],
	async (req, res) => {
		try {
			const creationTime = moment().format('X');

			// TODO V2
			// 1- Find Ingredients
			// 2- Get Value per serving for each nutrition fact
			// 3- Calculate Total value according with the amount of the ingredients
			// 4- Store value

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

router.get('/userlist', authorize, async (req, res) => {
	try {
		const recipes = await Recipe.find({ createdBy: req.userId });
		if (!recipes) {
			return responseHandler.handleBadRequestError(res, 'NO_RECIPES_FOUND');
		}
		recipes = await setUsersNames(recipes, User);
		return responseHandler.handleOKResponse(res, {
			message: 'RECIPES_FOUND',
			recipes
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'GET_MY_RECIPES_ERROR',
			error: err
		});
	}
});

router.get('/listpublic', async (req, res) => {
	try {
		const recipes = await Recipe.find({ isPublic: true });
		if (!recipes) {
			return responseHandler.handleBadRequestError(res, 'NO_RECIPES_FOUND');
		}
		// let creator;
		// let editor;
		// for (let r of recipes) {
		// 	creator = await User.findById(r.createdBy);
		// 	console.log(creator);
		// 	if (creator) {
		// 		r.createdBy = `${creator.firstName} ${creator.lastName}`;
		// 	}
		// 	editor = await User.findById(r.editedBy);
		// 	if (editor) {
		// 		r.editedBy = `${editor.firstName} ${editor.lastName}`;
		// 	}
		// }
		const recipesToReturn = await setUsersNames(recipes, User);
		return responseHandler.handleOKResponse(res, {
			message: 'PUBLIC_RECIPES',
			recipes: recipesToReturn
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'GET_PUBLIC_RECIPES_ERROR',
			error: err
		});
	}
});

router.get('/listall', authorize, async (req, res) => {
	try {
		const privateRecipes = await Recipe.find({
			createdBy: req.userId,
			isPublic: false
		});
		const publicRecipes = await Recipe.find({ isPublic: true });
		let recipes = [];
		if (!privateRecipes) {
			recipes = publicRecipes;
		} else if (!publicRecipes) {
			recipes = privateRecipes;
		} else {
			recipes = [...privateRecipes, ...publicRecipes];
		}
		recipes = await setUsersNames(recipes, User);
		return responseHandler.handleOKResponse(res, {
			message: 'ALL_RECIPES',
			recipes
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'GET_ALL_RECIPES_ERROR',
			error: err
		});
	}
});

router.put(
	'/update/:recipeid',
	[authorize, recipeValidations.addOrUpdateRecipe],
	async (req, res) => {
		try {
			const recipe = await Recipe.findById(req.params.recipeid);
			let recipeToUpdate;
			if (recipe.createdBy.toString() === req.userId.toString()) {
				recipeToUpdate = {
					isPublic: req.body.isPublic,
					editedIn: moment().format('X'),
					editedBy: req.userId,
					title: req.body.title,
					ingredients: req.body.ingredients,
					directions: req.body.directions,
					tips: req.body.tips,
					nutritionFacts: req.body.nutritionFacts,
					photo: req.body.photo
				};
			} else if (recipe.isPublic) {
				recipeToUpdate = {
					editedIn: moment().format('X'),
					editedBy: req.userId,
					title: req.body.title,
					ingredients: req.body.ingredients,
					directions: req.body.directions,
					tips: req.body.tips,
					nutritionFacts: req.body.nutritionFacts,
					photo: req.body.photo
				};
			} else {
				return responseHandler.handleBadRequestError(
					res,
					"CAN'T_UPDATE_RECIPE"
				);
			}

			if (recipeToUpdate) {
				await Recipe.findOneAndUpdate(
					{ _id: req.params.recipeid },
					{ $set: recipeToUpdate }
				);
				return responseHandler.handleOKResponse(res, {
					message: 'RECIPE_UPDATED',
					updatedRecipe: {
						_id: req.params.id,
						...recipeToUpdate
					}
				});
			}
		} catch (err) {
			return responseHandler.handleUnexpectedError(res, {
				message: 'UPDATE_RECIPE_ERROR',
				error: err
			});
		}
	}
);

router.delete('/delete/:recipeid', authorize, async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeid);
		if (!recipe) {
			return responseHandler.handleBadRequestError(res, 'RECIPE_NOT_FOUND');
		}
		if (recipe.createdBy.toString() === req.userId.toString()) {
			await Recipe.findByIdAndDelete({ _id: req.params.recipeid }, (err, r) => {
				if (err) {
					return responseHandler.handleUnexpectedError(res, {
						message: 'DELETE_RECIPE_ERROR',
						error: err
					});
				}
				return responseHandler.handleOKResponse(res, {
					message: 'RECIPE_REMOVED',
					id: req.params.recipeid
				});
			});
		}
		return responseHandler.handleBadRequestError(res, 'RECIPE_USER_NOT_MATCH');
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'DELETE_RECIPE_ERROR',
			error: err
		});
	}
});

module.exports = router;
