const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
	login: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(6)
				.required()
		})
	}),
	register: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.min(6)
				.required(),
			firstName: Joi.string()
				.min(1)
				.required(),
			lastName: Joi.string()
				.min(1)
				.required()
		})
	})
};
