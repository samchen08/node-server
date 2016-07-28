var log4js = require('log4js')
var config = require('./package.json');
log4js.configure(config.log4js);

module.exports = {
    __loggers: {},
    noop: function () {
    },
    logger: function (name) {
        var cache = this.__loggers[name];
        if (cache) {
            return cache;
        } else {
            var logger = log4js.getLogger(name);
            logger.setLevel('INFO');

            //如果不是debug, 不输出非错误日志
            if (!config.debug && name != 'normal') {
                logger.info = logger.warn = logger.debug = this.noop;
            }

            this.__loggers[name] = logger;
            return logger;
        }
    }
};