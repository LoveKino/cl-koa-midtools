import send from 'koa-send';
import path from 'path';
import promisify from 'es6-promisify';
import fs from 'fs';

let stat = promisify(fs.stat);

let def = (ctx) => {
    let rest = ctx.path.substring('/static'.length);
    return rest;
};

module.exports = (staticDir, getPath = def) => function* () {
    let rest = getPath;
    if (typeof getPath === 'function') {
        rest = getPath(this);
    }
    let filePath = path.join(staticDir, rest);
    console.log(filePath);
    let stats = yield stat(filePath);
    if (stats.isFile()) {
        yield send(this, rest, {
            root: staticDir
        });
    } else {
        throw new Error('file not found');
    }
};