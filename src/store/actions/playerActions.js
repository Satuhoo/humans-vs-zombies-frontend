import playerService from "../../services/player.service";

export const addPlayerToGame = (gameId, player ,jwtStr) => {
    return dispatch => {
        playerService.addPlayer(gameId, player ,jwtStr)
        .then(response => {
            dispatch({
                type: 'ADD_PLAYER',
                player: response.data
            })
        })
    }
}

export const getLoggedPlayer = (gameId, jwtStr) => {
    return dispatch => {
        playerService.getLoggedPlayerByToken(gameId, jwtStr)
        .then(response => {
            dispatch({
                type: 'GET_LOGGED_PLAYER',
                player: response.data
            })
        }).catch(err => {
            console.log('User has not player in this game')
            dispatch({
                type: 'GET_LOGGED_PLAYER',
                player: {id: -1}
            })
        });
    }
}

export const getPlayers = (gameId) => {
    return dispatch => {
        playerService.getPlayersByGameId(gameId)
        .then(response => {
            dispatch({
                type: 'GET_PLAYERS',
                players: response.data
            })
        })
    }
}