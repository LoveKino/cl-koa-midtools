/**
 * match rule
 */

let match = (way, ctx, mainAttr) => {
    let v = ctx;
    if (mainAttr) {
        v = ctx[mainAttr];
    }
    if (isAtom(way)) {
        return v === way;
    } else if (way instanceof RegExp) {
        return way.test(v);
    } else if (typeof way === 'function') {
        return way(ctx);
    } else if (isArray(way)) {
        // find match
        return way.findIndex((item) => match(item, ctx, mainAttr)) !== -1;
    } else if (isObject(way)) {
        for (let name in way) {
            let item = way[name];
            let ctxItem = isObject(ctx) && ctx[name];
            if (!match(item, ctxItem)) { // abandon mainAttr
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