const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
	addOrUpdateIngredient: celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string()
				.min(1)
				.required(),
			nutritionFacts: Joi.array()
				.items(
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
				)
				.required(),
			brand: Joi.string().min(1),
			icon: Joi.string().min(1)
		})
	})
};
