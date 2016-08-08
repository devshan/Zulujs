var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config');
var bootstrap = require('./settings/Bootstrap');
var cors = require('./settings/Cors');

var app = express();
var port = config.serverPort || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cors.setup(app);
bootstrap.boot(app);

app.listen(port, function () {
    logger.info('Example app listening on port ' + port + '!');
});