// const router = require('express').Router();

// const authorize = require('../middlewares/authorize');
// const responseHandler = require('../helpers/response.helper');
// const ingredientValidations = require('../middlewares/validations/ingredient.validations');

// const Ingredient = require('../models/ingredient.model');

// router.post(
// 	'/add',
// 	[authorize, ingredientValidations.addOrUpdateIngredient],
// 	async (req, res) => {
// 		try {
// 			const ingredientToAdd = new Ingredient({
// 				name: req.body.name,
// 				nutritionFacts: req.body.nutritionFacts,
// 				brand: req.body.brand,
// 				icon: req.body.icon
// 			});
// 			await ingredientToAdd.save();
// 			return responseHandler.handleOKResponse(res, {
// 				message: 'INGREDIENT_ADDED',
// 				name: ingredientToAdd.name
// 			});
// 		} catch (err) {
// 			return responseHandler.handleUnexpectedError(res, {
// 				message: 'ADD_INGREDIENT_ERROR',
// 				error: err
// 			});
// 		}
// 	}
// );

// router.get('/:id', authorize, async (req, res) => {
// 	try {
// 		const ingredient = await Ingredient.findOne({ _id: req.params.id });
// 		if (!ingredient) {
// 			return responseHandler.handleBadRequestError(res, 'INGREDIENT_NOT_FOUND');
// 		}
// 		return responseHandler.handleOKResponse(res, {
// 			message: 'INGREDIENT',
// 			ingredient
// 		});
// 	} catch (err) {
// 		return responseHandler.handleUnexpectedError(res, {
// 			message: 'GET_INGREDIENTS_LIST_ERROR',
// 			error: err
// 		});
// 	}
// });

// router.get('/list', authorize, async (req, res) => {
// 	try {
// 		const ingredients = await Ingredient.find({});
// 		if (!ingredients) {
// 			return responseHandler.handleBadRequestError(res, 'NO_INGREDIENTS_FOUND');
// 		}
// 		return responseHandler.handleOKResponse(res, {
// 			message: 'INGREDIENTS_LIST',
// 			ingredients
// 		});
// 	} catch (err) {
// 		return responseHandler.handleUnexpectedError(res, {
// 			message: 'GET_INGREDIENTS_LIST_ERROR',
// 			error: err
// 		});
// 	}
// });

// router.put(
// 	'/update/:id',
// 	[authorize, ingredientValidations.addOrUpdateIngredient],
// 	async (req, res) => {
// 		try {
// 			const ingredientToUpdate = {
// 				name: req.body.name,
// 				nutritionFacts: req.body.nutritionFacts,
// 				brand: req.body.brand,
// 				icon: req.body.icon
// 			};
// 			await Ingredient.findOneAndUpdate(
// 				{ _id: req.params.id },
// 				{ $set: ingredientToUpdate }
// 			);
// 			return responseHandler.handleOKResponse(res, {
// 				message: 'INGREDIENT_UPDATED',
// 				updatedIngredient: {
// 					_id: req.params.id,
// 					...ingredientToUpdate
// 				}
// 			});
// 		} catch (err) {
// 			return responseHandler.handleUnexpectedError(res, {
// 				message: 'UPDATE_INGREDIENT_ERROR',
// 				error: err
// 			});
// 		}
// 	}
// );

// router.delete('/delete/:id', authorize, async (req, res) => {
// 	try {
// 		Ingredient.findByIdAndDelete({ _id: req.params.id }, (err, ingredient) => {
// 			if (err) {
// 				return responseHandler.handleUnexpectedError(res, {
// 					message: 'DELETE_INGREDIENT_ERROR',
// 					error: err
// 				});
// 			}
// 			return responseHandler.handleOKResponse(res, {
// 				message: 'INGREDIENT_REMOVED',
// 				id: req.params.id
// 			});
// 		});
// 	} catch (err) {
// 		return responseHandler.handleUnexpectedError(res, {
// 			message: 'DELETE_INGREDIENT_ERROR',
// 			error: err
// 		});
// 	}
// });

// module.exports = router;
