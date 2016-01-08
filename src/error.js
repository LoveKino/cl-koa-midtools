import defLogger from './logger';

module.exports = (handlerMidGen, logger = defLogger) => function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
        logger.error(err);
        handlerMidGen && handlerMidGen(err).call(this, next);
    }
};