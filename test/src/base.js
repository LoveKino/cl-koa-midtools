import 'babel-polyfill'; // if you need to some feature like async await, open this notation.
import {
    responseTime,
    error,
    parseBody,
    api,
    pushMid,
    Static,
    route
}
from '../../index';
import request from 'supertest';
import koa from 'koa';

describe('base', () => {
    it('X-Response-Time', (done) => {
        const app = koa();
        app.use(responseTime);
        app.use(function*() {
            this.body = 'hello';
        });

        request(app.listen()).
        get('/abc')
            .expect('X-Response-Time', /[0-9]+ms/)
            .expect('hello', done);
    });

    it('error', (done) => {
        const app = koa();
        app.use(error());
        app.use(function*() {
            throw new Error('error happened!!');
        });

        request(app.listen()).
        get('/abc')
            .expect('error happened!!')
            .expect(500, done);
    });

    it('error2', (done) => {
        const app = koa();
        app.use(error(() => function*() {
            this.body = 'system error';
        }));
        app.use(function*() {
            throw new Error('error happened!!');
        });

        request(app.listen()).
        get('/abc')
            .expect('system error')
            .expect(500, done);
    });
});