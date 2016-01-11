import match from './util/match';
/**
 * TODO: abstract object matching.
 */

let easyMatch = (way, ctx) => {
    let matchCtx = ctx;
    if (typeof way === 'string' ||
        way instanceof RegExp) {
        matchCtx = ctx.url;
    }
    return match(way, matchCtx);
};

let route = (way, mid, errHandler) => {
    return function*(next) {
        if (easyMatch(way, this)) {
            try {
                yield mid.apply(this, [next]);
            } catch (err) {
                if (errHandler) {
                    yield errHandler(err).apply(this, [next]);
                } else {
                    throw err;
                }
            }
        } else {
            yield next;
        }
    };
};

route.or = (...args) => (ctx) =>
    !(args.findIndex(arg => easyMatch(arg, ctx)) === -1);

route.and = (...args) => (ctx) =>
    (args.findIndex(arg => !easyMatch(arg, ctx)) === -1);

module.exports = route;