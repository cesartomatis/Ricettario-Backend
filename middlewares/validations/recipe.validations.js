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
					name: Joi.string()
						.min(1)
						.required(),
					caloriesPerServing: Joi.string().min(1),
					quantity: Joi.object({
						amount: Joi.number(),
						unit: Joi.string().min(1)
					})
				})
			),
			directions: Joi.array().items(Joi.string().min(1)),
			preparationTime: Joi.number().required(),
			cookingTime: Joi.number().required(),
			difficulty: Joi.string()
				.required()
				.min(1),
			servings: Joi.number().required(),
			tips: Joi.string()
				.optional()
				.allow('')
				.min(1)
		})
	})
};
