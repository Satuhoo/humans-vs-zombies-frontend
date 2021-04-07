import http from '../http-common';

class GameService {
    getAllGames() {
        return http.get('/games');
    }

    getGameByID(id) {
        return http.get(`/games/${id}`)
    }

    addGame(game, jwtStr) {
        return http.post('/games', game, {
            'headers': {'Authorization': 'Bearer ' + jwtStr }}
        )
    }

    updateGame(id, game, jwtStr) {
        return http.put(`/games/${id}`, game, {
            'headers': {'Authorization': 'Bearer ' + jwtStr }}
        )
    }

    deleteGame(id, jwtStr) {
        return http.delete(`/games/${id}`, {
            'headers': {'Authorization': 'Bearer ' + jwtStr }}
        )
    }

    getKillsByGameId (id){
        return http.get(`/games/${id}/kills`)
    }

    getStatisticsByGameId (id){
        return http.get(`/games/${id}/statistics`)
    }
}

export default new GameService();