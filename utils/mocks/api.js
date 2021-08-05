const { of } = require('rxjs');

const sinon = require('sinon');
const { friendsDetailsMock, playsDetailMock } = require("./users")

const getFriendsDetailStub = sinon.stub();
getFriendsDetailStub.withArgs('ada_vang').resolves(of(friendsDetailsMock));

const getPlaysDetailStub = sinon.stub();
getPlaysDetailStub.withArgs('ada_vang').resolves(of(playsDetailMock));

class TwilioApiMock {
    constructor() {  }

    getFriendsDetail(username) {
        return getFriendsDetailStub(username);
    }

    getPlaysDetail(username) {
        return getPlaysDetailStub(username);
    }
}

module.exports = {
    getFriendsDetailStub,
    getPlaysDetailStub,
    TwilioApiMock
};