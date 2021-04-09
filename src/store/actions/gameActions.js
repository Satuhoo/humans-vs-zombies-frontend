import gameService from "../../services/game.service";

export const getGames = () => {
    return dispatch => {
        gameService.getAllGames()
        .then(response => {
            dispatch({
                type: 'GET_GAMES',
                games: response.data
            })
        })
    };
};

export const getGame = id => {
    return dispatch => {
        gameService.getGameByID(id)
        .then(response => {
            dispatch({
                type: 'GET_GAME',
                game: response.data
            })
        })
    };
}

export const createGame = (game, jwtStr) => {
    return dispatch => {
        console.log(jwtStr)
        gameService.addGame(game, jwtStr)
        .then(response => {
            dispatch({
                type: 'CREATE_GAME',
                newGame: response.data
            })
        })
    }
}

export const updateGameById = (game, jwtStr) => {
    return dispatch => {
        gameService.updateGame(game.id, game, jwtStr)
        .then(response => {
            dispatch({
                type: 'UPDATE_GAME',
                id: game.id,
                updatedGame: response.data                
            })
        })
    }
}

export const deleteGameById = (id, jwtStr) => {
    return dispatch => {
        gameService.deleteGame(id, jwtStr)
        .then(response => {
            console.log(response)
            dispatch({
                type: 'DELETE_GAME',
                payload: id
            })
        })
    }
}

export const setGameCoordinates = (coordinates) => ({
    type: 'SET_COORDINATES',
    coordinates: coordinates
})

export const clearGame = () => ({
    type: 'CLEAR_GAME'
})

export const getKills = (id) => {
    return dispatch => {
        gameService.getKillsByGameId(id)
        .then(response => {
            dispatch({
                type: 'GET_KILLS',
                kills: response.data
            })
        })
    };
}

export const getStatistics = (id) => {
    return dispatch => {
        gameService.getStatisticsByGameId(id)
        .then(response => {
            dispatch({
                type: 'GET_STATISTICS',
                statistics: response.data
            })
        })
    };
}
