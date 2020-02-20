const parseBody = (req, res, next) => {
	req.body = JSON.parse(req.body.data);
	next();
};

module.exports = parseBody;
