const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createAuthToken = (user) => {
	let token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		},
		process.env.JWT_SECRET,
		{
			expiresIn: `${process.env.SESSION_EXPIRATION}d`
		}
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
