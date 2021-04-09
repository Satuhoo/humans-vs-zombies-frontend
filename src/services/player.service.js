import http from '../http-common';

class PlayerService {
    addPlayer(gameId, player, jwtStr) {
        return http.post(`/games/${gameId}/players`, player, {
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

    getPlayersByGameId(gameId, jwtStr) {
        return http.get(`/games/${gameId}/players`, {
            'headers': {
              'Authorization': 'Bearer ' + jwtStr
            }
        })
    }

    updatePlayer(gameId, player, jwtStr) {
        return http.put(`/games/${gameId}/players/${player.id}`, player, {
            'headers': {
              'Authorization': 'Bearer ' + jwtStr
            }
        })
    }
}

export default new PlayerService();