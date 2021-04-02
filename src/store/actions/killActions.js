import killService from '../../services/kill.service'

export const killPlayer = (gameId, kill) => {
  return dispatch => {
    killService.killPlayer(gameId, kill)
      .then(response => {
        dispatch({
          type: 'KILL_PLAYER',
          kill: response.data
        })
        dispatch({
          type: 'ADD_KILL_TO_GAME',
          kill: response.data
        })
      })
  }
}