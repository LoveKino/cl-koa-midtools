let parseBody = (req) => new Promise((r) => {
    let chunks = [];
    req.on('data', (chunk) => {
        chunks.push(chunk);
    });
    req.on('end', () => {
        r(chunks.join(''));
    });
});


module.exports = function *(next) {
    let body = yield parseBody(this.req);
    this.request.body = body;
    yield next;
};