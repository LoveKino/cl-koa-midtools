import {
    quicks
}
from 'cl-interflow';

// TODO - lib
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

module.exports = (methods) => {
    let quickHttp = quicks.quickHttp({
        flusher: koaFlusher
    });

    return function *() {
        // create sample response
        let mid = quickHttp.mider((apiName) => methods(this, apiName));
        this.res.ctx = this;
        yield mid(this.req, this.res, this.request.body);
    };
};