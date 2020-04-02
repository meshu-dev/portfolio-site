const express    = require('express'),
	  app        = express(),
	  path       = require('path'),
	  bodyParser = require('body-parser');

// Load config params to process.env
require('dotenv').config();

const port = process.env.APP_PORT || 3000,
	  apiUrl = process.env.APP_API_SITE;

// Parse JSON data in requests
app.use(express.json())

// Parse urlencoded data of requests
app.use(bodyParser.urlencoded({
	extended: false
}))

// Serve files from public folder
app.use(express.static(path.join(__dirname, 'public')))

// Serve index.html to main url
app.use('/', express.static(path.join(__dirname, 'public')))

// Serve index.html to every GET page request
app.get('*', (req, res, next) => {
	res.status(200)
	   .sendFile(
	   		path.join(__dirname + '/public/index.html')
	   	)
})

// Start server
app.listen(port)
console.log('Server started on port ' + port)
