import http from '../http-common';

class PlayerService {
    addPlayer(gameId, player) {
        return http.post(`/games/${gameId}/players`, player)
    }
}

export default new PlayerService();