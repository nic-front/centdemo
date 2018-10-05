var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

app.use(cors())
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
	var s = '12'
    res.end( s );
})

app.post('/', function (req, res) {
	var a = req.param('a');
	var b = req.param('b');
	var sum = 1*a + 1*b;
    res.end( '' + sum );
})

var server = app.listen(8080, function () {

  var port = server.address().port

  console.log("Demo app listening on: %s",  port)

})