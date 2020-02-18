require('./config/config');
require('./db/mongoose');

const express = require('express');
const { isCelebrate } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');

const authController = require('./controllers/auth.controller');
const ingredientController = require('./controllers/ingredient.controller');
const recipeController = require('./controllers/recipe.controller');
const responseHelper = require('./helpers/response.helper');

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('ENVIRONMENT: ', process.env.NODE_ENV);

app.use('/api/auth', authController);
app.use('/api/ingredient', ingredientController);
app.use('/api/recipe', recipeController);

app.use((err, req, res, next) => {
	if (isCelebrate(err)) {
		return responseHelper.handleValidationError(res, err);
	} else {
		return responseHelper.handleUnexpectedError(res, {
			message: 'UNEXPECTED_ERROR',
			error: err
		});
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Ricettario Backend listening on port ${process.env.PORT}`);
});
