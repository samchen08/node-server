var log4js = require('log4js')
var config = require('./package.json');
log4js.configure(config.log4js);

module.exports = {
    logger: function (name) {
        var logger = log4js.getLogger(name);
        logger.setLevel('INFO');
        return logger;
    }
};