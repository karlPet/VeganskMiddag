var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require('body-parser');
var routes = require(__dirname + "/routes");
var app = express();

/*
* Mongoose by default sets the auto_reconnect option to true.
* We recommend setting socket options at both the server and replica set level.
* We recommend a 30 second connection timeout because it allows for
* plenty of time in most operating environments.
*/
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
               replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://admin:admin@ds141450.mlab.com:41450/veganrecipes';
mongoose.connect(mongodbUri, options);

// set the port for the app
app.set("port", process.env.PORT || 3000);

// set view folder and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set our static folder
app.use(express.static(__dirname + '/public'));

// add a json bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// our routes
app.use(routes);

//start listening for clients
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
