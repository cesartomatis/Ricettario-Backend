const router = require('express').Router();

const authValidations = require('../middlewares/validations/auth.validations');
const responseHandler = require('../helpers/response.helper');
const authHelper = require('../helpers/auth.helper');
const authorize = require('../middlewares/authorize');

const User = require('../models/user.model');

router.post('/register', authValidations.register, async (req, res) => {
	try {
		const userToAdd = new User({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		});
		const user = await User.findOne({ email: userToAdd.email });
		if (user) {
			return responseHandler.handleBadRequestError(res, {
				message: 'USER_EXISTS'
			});
		}
		userToAdd.password = authHelper.hashPassword(req.body.password);
		await userToAdd.save();
		return responseHandler.handleOKResponse(res, {
			message: 'USER_ADDED',
			email: userToAdd.email
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'USER_ERROR',
			error: err
		});
	}
});

router.get('/checksession', authorize, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		const token = req.token;
		if (!user) {
			return responseHandler.handleBadRequestError(res, {
				message: 'USER_NOT_LOGGED_IN'
			});
		}
		return responseHandler.handleOKResponse(res, {
			email: user.email,
			token
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'CHECKSESSION_ERROR',
			error: err
		});
	}
});

router.post('/login', authValidations.login, async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		let passwordValid = false;
		if (user) {
			passwordValid = authHelper.isPasswordValid(
				req.body.password,
				user.password
			);
		}
		if (!passwordValid) {
			return responseHandler.handleBadRequestError(
				res,
				'INCORRECT_USER_PASSWORD'
			);
		}
		const token = authHelper.createAuthToken(user._id);
		return responseHandler.handleOKResponse(res, {
			email: req.body.email,
			token
		});
	} catch (err) {
		return responseHandler.handleUnexpectedError(res, {
			message: 'LOGIN_ERROR',
			error: err
		});
	}
});

module.exports = router;
