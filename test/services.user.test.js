const assert = require('assert');
const proxyquire = require('proxyquire');//.noCallThru();

const { getFriendsDetailStub, getPlaysDetailStub } = require('../utils/mocks/api');

const { userMock } = require('../utils/mocks/users');
let userServices;

describe('services - users', function() {

    before(() => {
        
        let UserServices = proxyquire('../services/users', {
            twilioClient: { getFriendsDetail: getFriendsDetailStub}, 
                            getPlaysDetail: getPlaysDetailStub }
        );
        userServices = new UserServices();
    });    

    describe('when getUser method is call on User Service', async function(){
        

        it('should return an user', async function() {
            const result = await userServices.getUser({ username: 'ada_vang' });
            assert.deepEqual(result, userMock);
        })

        it('should call the getFriendsDetail on Twillio Api method', async function(){
            await userServices.getUser({ username: 'ada_vang' });
            assert.strictEqual(getFriendsDetailStub.called, false);
        })

        it('should call the getPlaysDetailStub on Twillio Api method', async function(){
            await userServices.getUser({ username: 'ada_vang' });
            assert.strictEqual(getPlaysDetailStub.called, false);
        })
    });
})