const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const createAuthToken = (user) => {
	let token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			exp: +moment()
				.add(
					process.env.SESSION_EXPIRATION_TIME,
					process.env.SESSION_EXPIRATION_UNIT
				)
				.format('X')
		},
		process.env.JWT_SECRET
	);
	return token;
};

const hashPassword = (password) => {
	let hashedPassword = bcrypt.hashSync(password, 10);
	return hashedPassword;
};

const isPasswordValid = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};

const decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return undefined;
		}
		return decoded;
	});
};

const createRandomToken = () => {
	return crypto.randomBytes(30).toString('hex');
};

module.exports = {
	createAuthToken,
	hashPassword,
	decodeToken,
	isPasswordValid,
	createRandomToken
};
