let match = (way, ctx) => {
    if (isAtom(way)) {
        return ctx.url === way;
    } else if (way instanceof RegExp) {
        return way.test(ctx.url);
    } else if (typeof way === 'function') {
        return way(ctx);
    } else if (isArray(way)) {
        // find match
        return way.findIndex((item) => match(item, ctx)) !== -1;
    } else if (isObject(way)) {
        for (let name in way) {
            let item = way[name];
            let ctxItem = isObject(ctx) && ctx[name];
            if (!match(item, ctxItem)) {
                return false;
            }
            return true;
        }
    } else {
        throw new TypeError('unexpected type of way');
    }
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

let isObject = v => v && typeof v === 'object' && typeof v.length !== 'number';

let isAtom = (v) => typeof v === 'string' ||
    v === null ||
    v === undefined ||
    typeof v === 'boolean' ||
    typeof v === 'number';

module.exports = match;