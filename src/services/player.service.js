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

    getPlayersByGameId(gameId) {
        return http.get(`/games/${gameId}/players`)
    }

    updatePlayer(gameId, player) {
        return http.put(`/games/${gameId}/players/${player.id}`, player)
    }
}

export default new PlayerService();