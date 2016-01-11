import match from './util/match';
/**
 * TODO: abstract object matching.
 */

let route = (way, mid, errHandler) => {
    return function * (next) {
        if (match(way, this, 'url')) {
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

module.exports = route;