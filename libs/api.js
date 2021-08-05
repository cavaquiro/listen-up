const { RxHR } =  require('@akanass/rx-http-request');
const { config } = require('../config/index');
const { map } = require('rxjs/operators');

const BASE_PATH = config.basePath;

class TwilioApi {
    constructor() { }

    getFriendsDetail(username) {
        return RxHR.get(`${BASE_PATH}/friend-detail?username=${username}`, {json: true}).pipe(map(response => response.body));
    }

    getPlaysDetail(username){
        return RxHR.get(`${BASE_PATH}/plays-detail?username=${username}`, {json: true}).pipe(map(response => response.body));
    }
}

module.exports = { TwilioApi }