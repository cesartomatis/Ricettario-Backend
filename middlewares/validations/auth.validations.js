const validate = require('express-validation');
const joi = require('joi');

module.exports = {
	login: validate({
		body: {
			email: joi
				.string()
				.email()
				.required(),
			password: joi
				.string()
				.min(6)
				.required()
		}
	}),
	register: validate({
		body: {
			email: joi
				.string()
				.email()
				.required(),
			password: joi
				.string()
				.min(6)
				.required(),
			firstName: joi
				.string()
				.min(1)
				.required(),
			lastName: joi
				.string()
				.min(1)
				.required()
		}
	})
};
