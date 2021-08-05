const assert = require('assert');
const proxyquire = require('proxyquire');

const { userMock, UsersServiceMock } = require('../utils/mocks/users');
const testServer = require('../utils/testServer');

describe('routes - users', function() {
    const route = proxyquire('../routes/users', {
        '../services/users': UsersServiceMock
    });

    const request = testServer(route);

    describe('GET /users/:username', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/users/ada_vang').expect(200, done);
        });
        
        it('should respond with a valid user', function(done) {
            request.get('/api/users/ada_vang').end((err, res) => {
                assert.deepEqual(res.body, {
                    ... userMock,
                    uri: `/users/ada_vang`
                });
                done();
            });

        });
    })
});