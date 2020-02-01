process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../src/config/connection');

describe('routes : API REGISTER - LOGIN', () => {

    // test route POST `/auth/register`
    describe('POST /auth/register', () => {
        it('Register a new user', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(400);
                    res.type.should.equal('application/json');
                    res.body.should.include.keys(
                        'code', 'message'
                    );
                    done();
                });
        });
    });

    // test route POST `/auth/login`
    describe('POST /auth/login', () => {
        it('User login', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    username: 'luongnguyen',
                    password: '123'
                })
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(400);
                    res.type.should.equal('application/json');
                    res.body.should.include.keys(
                        'code', 'message'
                    );
                    done();
                });
        });
    });
});
