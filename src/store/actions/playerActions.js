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

export const getPlayers = (gameId, jwtStr) => {
    return dispatch => {
        playerService.getPlayersByGameId(gameId, jwtStr)
        .then(response => {
            dispatch({
                type: 'GET_PLAYERS',
                players: response.data
            })
        })
    }
}

export const clearPlayer = () => ({
    type: 'CLEAR_PLAYER'
})

export const updatePlayer = (gameId, player, jwtStr) => {
    return dispatch => {
        playerService.updatePlayer(gameId, player, jwtStr)
        .then(response => {
            dispatch({
                type: 'UPDATE_PLAYER',
                updatedPlayer: response.data
            })
        })
    }
}
