const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
	addOrUpdateRecipe: celebrate({
		[Segments.BODY]: Joi.object().keys({
			isPublic: Joi.boolean(),
			title: Joi.string()
				.min(1)
				.required(),
			ingredients: Joi.array().items(
				Joi.object({
					idIngredient: Joi.string()
						.regex(/^[0-9a-fA-F]{24}$/)
						.required(),
					amount: Joi.number().required(),
					unit: Joi.string()
						.min(1)
						.required()
				})
			),
			directions: Joi.array().items(
				Joi.object({
					preparationTime: Joi.number().required(),
					cookTime: Joi.number().required(),
					readyIn: Joi.number().required(),
					steps: Joi.array().items(Joi.string().min(1))
				})
			),
			nutritionFacts: Joi.array().items(
				Joi.object({
					name: Joi.string()
						.min(1)
						.required(),
					valuePerServing: Joi.object().keys({
						value: Joi.number().required(),
						unit: Joi.string()
							.min(1)
							.required()
					}),
					valuePerHundred: Joi.object().keys({
						value: Joi.number().required(),
						unit: Joi.string()
							.min(1)
							.required()
					})
				})
			),
			tips: Joi.string().min(1)
		})
	})
};
