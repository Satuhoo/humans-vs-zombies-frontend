import http from '../http-common';

class KillService {
  killPlayer(gameId, kill) {
    return http.post(`games/${gameId}/kills`, kill)
  }

  getAllKillsByGameId(gameId) {
    return http.get(`games/${gameId}/kills`)
  }
}

export default new KillService();