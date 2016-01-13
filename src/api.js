import {
    plainhttp
}
from 'cl-interflow';

// use this one : this.body = res.body
let koaFlusher = (res) => (rawOut) => {
    let outBody = rawOut.body;
    outBody = outBody ? JSON.stringify(outBody) : '';
    res.ctx.body = outBody;
    let resHeaders = rawOut.headers;
    if(resHeaders) {
        for(let name in resHeaders) {
            res.ctx.set(name, resHeaders[name]);
        }
    }
};

let { mider } = plainhttp({
    processor: plainhttp.processors.rc,
    flusher: koaFlusher,
    midForm: (dealer, flusher) => function* () {
        this.res.ctx = this;
        dealer({
            req: this.req,
            body: this.request.body
        }, flusher(this.res));
    }
});

let finder = (methods, ctx) => (ins) => {
    let apiName = ins[0];
    let args = ins[1];
    let method = methods(ctx, apiName);
    return method(...args);
};

module.exports = (methods) => {
    return mider(finder(methods, this));
};