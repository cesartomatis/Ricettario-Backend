const validate = require('express-validation');
const joi = require('@hapi/joi');

module.exports = {
	addIngredient: validate({
		body: {
			name: joi
				.string()
				.min(1)
				.required(),
			nutritionFacts: joi
				.array()
				.items(
					joi.object({
						name: joi
							.string()
							.min(1)
							.required(),
						valuePerServing: joi
							.string()
							.min(1)
							.required(),
						valuePerHundred: joi.string().min(1)
					})
				)
				.required(),
			icon: joi.string().min(1)
		}
	})
};
