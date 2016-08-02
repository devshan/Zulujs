var express = require('express');
var config = require('./config');
var bootstrap = require('./bootstrap');
var app = express();
var port = config.serverPort || process.env.PORT;

bootstrap.boot(app);

app.listen(port, function () {
    logger.info('Example app listening on port ' + port + '!');
});