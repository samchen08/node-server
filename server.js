var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var log4js = require('log4js');

var config = require('./package.json');
var logger = require('./logger').logger('http');
var routers = require('./server/router');

function setMethod(app, type, url, handler) {
    type.toUpperCase() === 'POST' ? app.post(url, handler) : app.get(url, handler);
}


function setRouter(app, url, item) {
    switch (typeof item) {
        case 'function':
            app.get(url, item);
            break;
        case 'object':
            if (item.handler) {
                var methods = typeof item.method === 'string' ? [item.method] : item.method;
                methods.forEach(function (type) {
                    setMethod(app, type, url, item.handler);
                });
            }
            break;
        default:
            break;
    }
}


function initRouter(app) {
    var url, item;
    for (url in routers) {
        item = routers[url];
        setRouter(app, url, item);
    }
}


module.exports = {
    init: function () {
        var app = new express();
        app.set('port', config.httpPort || 80);
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');

        app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
        app.use(express.static(path.join(__dirname, 'static')));
        app.use(favicon(path.join(__dirname, 'static/favicon.ico')));
        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: 'uwotm8'
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        initRouter(app);

        app.listen(app.get('port'), function () {
            console.log('Express server listening on port ', app.get('port'));
        });

    }
};