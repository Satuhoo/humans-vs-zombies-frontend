import killService from '../../services/kill.service'

export const killPlayer = (gameId, kill) => {
  return dispatch => {
    killService.killPlayer(gameId, kill)
      .then(response => {
        dispatch({
          type: 'RESET_ERRORS'
        })
        dispatch({
          type: 'KILL_PLAYER',
          kill: response.data
        })
        dispatch({
          type: 'ADD_KILL_TO_GAME',
          kill: response.data
        })
      })
      .catch(() => {
        dispatch({
          type: 'KILL_ERROR'
        })
      }) 
  }
}

export const getAllKills = (gameId) => {
  return dispatch => {
    killService.getAllKillsByGameId(gameId)
    .then(response => {
      dispatch({
        type: 'GET_ALL_KILLS',
        kills: response.data
      })
    })
  }
}

export const clearError = () => ({
  type: 'RESET_ERRORS'
})