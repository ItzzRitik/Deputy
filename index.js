const express = require('express'),
	chalk = require('chalk'),
	app = express(),
	request = require('request'),
	{ getAllCountries, getCountryCodeByName, getCountryCodeByDialCode, getCountryFlagByCountryCode,
		getCountryFlagByName, getCountryFlagByDialCode } = require('./utils/getCountries');

require('dotenv');

app.get('/getCountries', (req, res) => {
	res.json(getAllCountries());
});
app.get('/getCountryCode', (req, res) => {
	const { name } = req.query;
	res.json(getCountryCodeByName(countryName));
});
app.get('/getCountryFlag', (req, res) => {
	const { country } = req.query,
		countryFlag = getCountryFlagByCountryCode(country) || getCountryFlagByName(country);
	
	if (!countryFlag) return res.json({ error: 'Please provide valid country name/code' });
	request(countryFlag).pipe(res)
});

app.listen(process.env.PORT || 8080, () => {
	console.log('⪢   ', 'Starting Server');
	console.log('✔️   ', 'Server is running at', chalk.green('http://' + (process.env.IP || 'localhost') + ':' + (process.env.PORT || 8080)));
});