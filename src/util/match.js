/**
 * match rule
 */

let match = (way, ctx) => {
    if (isAtom(way)) {
        return ctx === way;
    } else if (way instanceof RegExp) {
        return way.test(ctx);
    } else if (typeof way === 'function') {
        return way(ctx, match);
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

let isObject = v => v && typeof v === 'object';

let isAtom = (v) => typeof v === 'string' ||
    v === null ||
    v === undefined ||
    typeof v === 'boolean' ||
    typeof v === 'number';

module.exports = match;