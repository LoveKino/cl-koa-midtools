import 'babel-polyfill'; // if you need to some feature like async await, open this notation.
import {
    route,
    pushMid
}
from '../../index';
import request from 'supertest';
import koa from 'koa';

describe('base', () => {
    it('route0', (done) => {
        const app = koa();
        pushMid(app, [
            route('/abc', function*() {
                this.body = 'hello1';
            })
        ]);

        request(app.listen())
            .get('/abc')
            .expect('hello1')
            .expect(200, done);
    });

    it('route1', (done) => {
        const app = koa();
        pushMid(app, [
            route(/\/id\//, function*() {
                this.body = 'hello1';
            })
        ]);

        request(app.listen())
            .get('/id/12345')
            .expect('hello1')
            .expect(200, done);
    });

    it('route2', (done) => {
        const app = koa();
        pushMid(app, [
            route((ctx) => ctx.url === '/abc', function*() {
                this.body = 'hello1';
            })
        ]);

        request(app.listen())
            .get('/abc')
            .expect('hello1')
            .expect(200, done);
    });

    it('route3', (done) => {
        const app = koa();
        pushMid(app, [
            route(['/abc', '/bcd'], function*() {
                this.body = 'hello1';
            })
        ]);

        request(app.listen())
            .get('/bcd')
            .expect('hello1')
            .expect(200, done);
    });
});