import 'babel-polyfill'; // if you need to some feature like async await, open this notation.
import {
    responseTime,
    error,
    access,
    parseBody,
    api,
    pushMid,
    Static
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

        request(app.listen())
            .get('/abc')
            .expect('X-Response-Time', /[0-9]+ms/)
            .expect('hello', done);
    });

    it('access', (done) => {
        const app = koa();
        app.use(access());

        app.use(function *() {
            this.body = 'ok!';
        });

        request(app.listen())
            .get('/abc')
            .expect(200, done);
    });

    it('error', (done) => {
        const app = koa();
        app.use(error());
        app.use(function*() {
            throw new Error('error happened!!');
        });

        request(app.listen())
            .get('/abc')
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

        request(app.listen())
            .get('/abc')
            .expect('system error')
            .expect(500, done);
    });

    it('parseBody', (done) => {
        const app = koa();
        app.use(parseBody);
        app.use(function*() {
            this.body = this.request.body;
        });

        request(app.listen())
            .post('/')
            .send({
                name: 'tobi'
            })
            .expect('{"name":"tobi"}')
            .expect(200, done);
    });

    it('pushMid', (done) => {
        const app = koa();
        pushMid(app, [
            parseBody,
            function*() {
                this.body = this.request.body;
            }
        ]);

        request(app.listen())
            .post('/')
            .send({
                name: 'tobi'
            })
            .expect('{"name":"tobi"}')
            .expect(200, done);
    });

    it('static', (done) => {
        const app = koa();
        pushMid(app, [
            Static(__dirname + '/../fixtures')
        ]);

        request(app.listen())
            .get('/static/test.txt')
            .expect('hello!')
            .expect(200, done);
    });
});