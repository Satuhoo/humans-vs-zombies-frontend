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

export const createGame = game => {
    return dispatch => {
        gameService.addGame(game)
        .then(response => {
            dispatch({
                type: 'CREATE_GAME',
                newGame: response.data
            })
        })
    }
}

export const updateGameById = (game) => {
    return dispatch => {
        gameService.updateGame(game.id, game)
        .then(response => {
            dispatch({
                type: 'UPDATE_GAME',
                id: game.id,
                updatedGame: response.data
            })
        })
    }
}

export const deleteGameById = (id) => {
    return dispatch => {
        gameService.deleteGame(id)
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

<<<<<<< HEAD
export const clearGame = () => ({
    type: 'CLEAR_GAME'
})
=======

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
>>>>>>> feat: add template for getting kills from backend
