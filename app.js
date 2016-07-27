var path = require('path');
var cluster = require('cluster');
var cups = require('os').cpus();

var server = require('./server');
var logger = require('./logger').logger('console');

if (cluster.isMaster) {
    var workers = [];
    var spawn = function (i) {
        workers[i] = cluster.fork();
        workers[i].on('exit', function (worker, ocde, signal) {
            logger.info('respawning worker', i);
            spawn(i);
        });
    };

    cups.forEach(function () {
        cluster.fork();
    });

    cluster.on('listening', function (worker, server) {
        logger.info('worker connected to', server.address, server.port, worker.id);
    });

    logger.info('server running....');

} else {

    server.init();

}