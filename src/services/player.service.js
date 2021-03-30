import http from '../http-common';

class PlayerService {
    addPlayer(gameId, jwtStr) {
        return http.post(`/games/${gameId}/players`, {}, {
            'headers': {
              'Authorization': 'Bearer ' + jwtStr
            }
        })
    }

    getLoggedPlayerByToken(gameId, jwtStr) {
        return http.get(`/games/${gameId}/players/currentplayer`, {
            'headers': {
              'Authorization': 'Bearer ' + jwtStr
            }
        })
    }

    getPlayersByGameId(gameId) {
        return http.get(`/games/${gameId}/players`)
    }
}

export default new PlayerService();