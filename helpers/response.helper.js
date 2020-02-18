const HTTP_STATUS = require('http-status-codes');

const handleOKResponse = (res, dto) => {
	return res.status(HTTP_STATUS.OK).send(dto);
};

const handleUnexpectedError = (res, dto) => {
	let errorMessage = dto.message;
	if (dto.error && dto.error.message == 'MongoError') {
		errorMessage = 'DB_ERROR';
	}
	const statusCode = dto.error.statusCode
		? dto.error.statusCode
		: HTTP_STATUS.SERVICE_UNAVAILABLE;
	return res.status(statusCode).send({
		status: statusCode,
		statusText: HTTP_STATUS.getStatusText(statusCode),
		fieldsError: [],
		errorMessage: errorMessage,
		errorObj: dto.error
	});
};

const handleValidationError = (res, error) => {
	return res
		.status(HTTP_STATUS.BAD_REQUEST)
		.send({ message: 'CELEBRATE_VALIDATION_ERROR', ...error });
};

const handleCustomErrorResponse = (res, httpStatusCode, errorMessage) => {
	return res.status(httpStatusCode).send({
		status: httpStatusCode,
		statusText: HTTP_STATUS.getStatusText(httpStatusCode),
		fieldsError: [],
		errorMessage: errorMessage
	});
};

const handleBadRequestError = (res, errorMessage) => {
	return handleCustomErrorResponse(res, HTTP_STATUS.BAD_REQUEST, errorMessage);
};

const handleNotExistingResponse = (res) => {
	return handleBadRequestError(res, 'Record does not exist');
};

module.exports = {
	handleOKResponse,
	handleBadRequestError,
	handleValidationError,
	handleUnexpectedError,
	handleNotExistingResponse,
	handleCustomErrorResponse
};
