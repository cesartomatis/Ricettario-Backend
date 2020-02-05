const environment = process.env.NODE_ENV || 'dev';
const config = require('./config.json');
const envConfig = config[environment];
Object.keys(envConfig).forEach((key) => {
	process.env[key] = envConfig[key];
});
