const initialState = {
    game: {},
    games: [],
    kills: []    
}

export function gameReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: action.games,
            }
        case 'GET_GAME':
            return {
                ...state,
                game: action.game
            }
        case 'CREATE_GAME':
            return {
                ...state,
                games: [...state.games, action.newGame]
            }
        case 'UPDATE_GAME':
            return {
                ...state,
                game: action.updatedGame
            }
        case 'DELETE_GAME':
            return {
                ...state,
                games: state.games.filter(i => i.id !== action.payload)
            }
        case 'SET_COORDINATES':
            return {
                ...state,
                coordinates: action.coordinates
            }

        case 'GET_KILLS':
            return{
                ...state,
                kills: action.kills
            }
            
        case 'ADD_KILL_TO_GAME':
            return {
                ...state,
                game: {
                    ...state.game,
                    kills: state.game.kills.concat(action.kill)
                },
                games: state.games.map(game => 
                    game.id === state.game.id 
                    ? {
                        ...game,
                        kills: game.kills.concat(action.kill)
                    }
                    : game
                )
            }
        case 'GET_ALL_KILLS':
            return {
                ...state,
                kills: action.kills
            }
        case 'CLEAR_GAME':
            return {
                ...state,
                game: undefined,
                statistics: undefined
            }
        case 'GET_STATISTICS':
            return {
                ...state,
                statistics: action.statistics
            }
        default:
            return state
    }
}