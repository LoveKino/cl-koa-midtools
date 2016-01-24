import {
    plainhttp
}
from 'cl-interflow';

let processor = plainhttp.processors.ep.pack(plainhttp.processors.rc);

// use this one : this.body = res.body
let koaFlusher = (res) => (rawOut) => {
    let outBody = rawOut.body;
    res.ctx.body = outBody;
    let resHeaders = rawOut.headers;
    if(resHeaders) {
        for(let name in resHeaders) {
            res.ctx.set(name, resHeaders[name]);
        }
    }
};

let { mider } = plainhttp({
    processor,
    flusher: koaFlusher,
    midForm: (dealer, flusher) => function* () {
        this.res.ctx = this;
        return dealer({
            req: this.req,
            body: this.request.body
        }, flusher(this.res));
    }
});

let finder = (methods, ctx) => (ins=[]) => {
    let apiName = ins[0];
    let args = ins[1];
    let method = methods(ctx, apiName);
    ctx.apiError = plainhttp.processors.exception;
    return method && method.apply(undefined, args);
};

module.exports = function (methods) {
    return function * (next) {
        let mid = mider(finder(methods, this));
        return yield mid.call(this, next);
    };
};
