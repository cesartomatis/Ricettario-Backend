const HTTP_STATUS = require('http-status-codes');
const moment = require('moment');

const authHelper = require('../helpers/auth.helper');
const responseHandler = require('../helpers/response.helper');

const authorize = (req, res, next) => {
	if (!req.headers.authorization) {
		return responseHandler.handleCustomErrorResponse(
			res,
			HTTP_STATUS.FORBIDDEN
		);
	}
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return responseHandler.handleCustomErrorResponse(
			res,
			HTTP_STATUS.FORBIDDEN,
			'TOKEN_MISSING'
		);
	}
	const decodedToken = authHelper.decodeToken(token);
	if (!decodedToken || moment(decodedToken.exp).isAfter(moment())) {
		return responseHandler.handleCustomErrorResponse(
			res,
			HTTP_STATUS.UNAUTHORIZED
		);
	}
	req.userId = decodedToken.id;
	next();
};

module.exports = authorize;
