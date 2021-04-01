import killService from '../../services/kill.service'

export const killPlayer = (gameId, kill) => {
  return dispatch => {
    killService.killPlayer(gameId, kill)
      .catch(error => console.error(error))
    dispatch({
      type: 'KILL_PLAYER'
    })
  }
}