//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var url = require('url');
var app = express();
var request = require('request');
var serveIndex = require('serve-index');

// Body Parser Middleware
app.use(bodyParser.json()); 


// Test Fix for Unsafe HTTP Options
const allowedMethods = ['GET', 'HEAD', 'POST'];


app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) return res.status(405).send();
    return next();
})


//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['https://om3uat.smartgeo.sg', 'https://www.onemap3d.gov.sg'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
	res.header("Cache-control", "public, max-age=3600");
    next();
});

//Serve 3D Map Tiles in Folder
app.use('/',  express.static('../onemap3dwebapp'));

//Setting up server
 var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    //console.log("app is running on port 8000")
 });
 
