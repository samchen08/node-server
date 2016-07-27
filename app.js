var path = require('path');
var cluster = require('cluster');
var cups = require('os').cpus();

var server = require('./server');

//获取logger对象, 日志用console的名称分组
var logger = require('./logger').logger('console');

if (cluster.isMaster) {
    var workers = [];

    //创建子进程,并且当子进程退出的时候自动恢复
    var spawn = function (i) {
        workers[i] = cluster.fork();
        workers[i].on('exit', function (worker, ocde, signal) {
            logger.info('respawning worker', i);
            spawn(i);
        });
    };

    //子进程创建完成后, 提示信息
    cluster.on('listening', function (worker, server) {
        logger.info('worker connected to', server.address, server.port, worker.id);
    });

    //根据cpu内核个数创建子进程
    cups.forEach(function (n, i) {
        spawn(i)
    });
    
    logger.info('server running....');

} else {
    server.init();
}