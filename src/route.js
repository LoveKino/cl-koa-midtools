let route = (way, mid, errHandler) => {
    return function* (next) {
        if(match(way, this)){
            try {
                yield mid.apply(this, [next]);
            } catch (err) {
                if(errHandler) {
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

let match = (way, ctx) => {
    if (typeof way === 'string') {
        if (ctx.url === way) {
            return true;
        } else {
            return false;
        }
    } else if (way instanceof RegExp) {
        return way.test(ctx.url);
    } else if (typeof way === 'function') {
        return way(ctx);
    }
};

module.exports = route;