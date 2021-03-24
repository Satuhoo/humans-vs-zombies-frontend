const initialState = {
    game: {},
    games: []
}

export function gameReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_GAMES':
            console.log('state', action)
            return {
                ...state,
                games: action.games,
            }
        case 'GET_GAME':
            console.log('state', action)
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
        default:
            return state
    }
}