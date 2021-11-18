const express = require('express'),
	chalk = require('chalk'),
	app = express(),
	request = require('request');

	initLogger = require('./utils/logger'),
	{ getAllCountries, getCountryCodeByName, getCountryCodeByDialCode, getCountryFlagByCountryCode,
		getCountryFlagByName, getCountryFlagByDialCode } = require('./utils/getCountries');

require('dotenv');
initLogger();

app.get('/getAllCountries', (req, res) => {
	res.json(getAllCountries());
});
app.get('/getCountryCodeByName', (req, res) => {
	const { countryName } = req.query;
	res.json(getCountryCodeByName(countryName));
});
app.get('/getCountryFlagByCountryCode', (req, res) => {
	const { CountryCode } = req.query;
	res.pipe(getCountryFlagByCountryCode(CountryCode));
});
app.get('/getCountryFlagByName', (req, res) => {
	const { countryName } = req.query;
	request(getCountryFlagByName(countryName)).pipe(res);
});

app.listen(process.env.PORT || 8080, () => {
	console.log(true, 'Starting Server');
	console.log('✔️', 'Server is running at', chalk.green('http://' + (process.env.IP || 'localhost') + ':' + (process.env.PORT || 8080)));
});