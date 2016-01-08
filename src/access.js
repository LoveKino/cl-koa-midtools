import defLogger from './logger';

module.exports = (logger = defLogger) => function*(next) {
    logger.info(this.url);
    yield next;
};