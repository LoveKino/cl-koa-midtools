import defLogger from './logger';

module.exports = (handlerMidGen, logger = defLogger) => function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        logger.error(err, err.stack);
        if(handlerMidGen) {
            yield handlerMidGen(err).call(this, next);
        }
    }
};