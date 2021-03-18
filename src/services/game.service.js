import http from '../http-common';

class GameService {
    getAllGames() {
        return http.get('/games');
    }

    getGameByID(id) {
        return http.get(`/games/${id}`)
    }

    addGame(game) {
        return http.post('/games', game)
    }

    updateGame(id, game) {
        return http.put(`/games/${id}`, game)
    }

    deleteGame(id) {
        return http.delete(`/games/${id}`)
    }
}

export default new GameService();