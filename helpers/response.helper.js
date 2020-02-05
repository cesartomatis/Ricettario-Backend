const HTTP_STATUS = require('http-status-codes');

const handleOKResponse = (res, dto) => {
	return res.status(HTTP_STATUS.OK).send(dto);
};

const handleUnexpectedError = (res, dto) => {
	let errorMessage;
	console.log(dto.error);
	if (dto.error && dto.error.message == 'MongoError') {
		errorMessage = 'DB_ERROR';
	}
	return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
		status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		statusText: HTTP_STATUS.getStatusText(HTTP_STATUS.INTERNAL_SERVER_ERROR),
		fieldsError: [],
		errorMessage: errorMessage || dto.message,
		errorObj: error
	});
};

const handleValidationError = (res, error) => {
	error.errors.forEach((error) => {
		delete error.location;
		delete error.types;
	});
	return res.status(HTTP_STATUS.BAD_REQUEST).send({
		status: HTTP_STATUS.BAD_REQUEST,
		statusText: HTTP_STATUS.getStatusText(HTTP_STATUS.BAD_REQUEST),
		fieldsError: error.errors,
		errorMessage: 'Validation Error'
	});
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
