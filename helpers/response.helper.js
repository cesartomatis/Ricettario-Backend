const HTTP_STATUS = require('http-status-codes');

const handleOKResponse = (res, dto) => {
	return res.status(HTTP_STATUS.OK).send(dto);
};

const handleUnexpectedError = (res, dto) => {
	return res
		.status(dto.error.statusCode)
		.send({ message: dto.message, ...dto.error });
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
