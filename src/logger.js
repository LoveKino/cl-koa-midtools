import colors from 'colors';
import tracer from 'tracer';

var logger = tracer.colorConsole({
    filters : {
        trace : colors.magenta,
        debug : colors.blue,
        info : colors.green,
        warn : colors.yellow,
        error : [ colors.red, colors.bold ]
    }
});

module.exports = logger;