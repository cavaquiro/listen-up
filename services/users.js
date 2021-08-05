const { map } = require('rxjs/operators');
const { forkJoin, firstValueFrom } = require('rxjs');
const { TwilioApi } = require('../libs/api');

class UsersService {
    constructor() {
        this.twilioClient = new TwilioApi();
    }

    async getUser({ username }) {
        const userFriend$ = this.twilioClient.getFriendsDetail(username);
        const userPlays$ = this.twilioClient.getPlaysDetail(username);

        const joinedUserData$ = forkJoin(
            {
                userPlaysCount: userPlays$.pipe(map(userPlays => (userPlays.plays) ? userPlays.plays.length : 0)), 
                userFirendsCount: userFriend$.pipe(map(userFriends => (userFriends.friends) ? userFriends.friends.length : 0)), 
                userTracks: userPlays$.pipe(map(userPlays => (userPlays.plays) ? userPlays.plays.filter((value,index,self) => self.indexOf(value) === index): []))
            });

        const userData$ = joinedUserData$
            .pipe(
                map(({userPlaysCount, userFirendsCount, userTracks}) => (
                    {
                        username: username,
                        plays: userPlaysCount,
                        friends: userFirendsCount,
                        tracks: userTracks 
                    }
              )));    
        
        const user =  firstValueFrom(userData$);

        return user || {};
    }
}

module.exports = UsersService;