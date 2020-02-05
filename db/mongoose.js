const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(
		() => {
			console.log('Connected to Mongo instance.');
		},
		(err) => {
			console.log('Error connecting to Mongo instance: ', err);
		}
	);

module.exports = {
	mongoose
};
