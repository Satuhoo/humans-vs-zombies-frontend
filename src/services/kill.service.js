import http from '../http-common';

class KillService {
  killPlayer(gameId, kill) {
    return http.post(`games/${gameId}/kills`, kill)
  }
}

export default new KillService();