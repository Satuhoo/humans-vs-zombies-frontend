const initialState = {
    players: []
}

export function playerReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_PLAYER':
            return {
                ...state,
                player: action.player
            }
        case 'GET_PLAYERS':
            return {
                ...state,
                players: action.players
            }
        case 'GET_LOGGED_PLAYER':
            return {
                 ...state,
                player: action.player
            }
        case 'CLEAR_PLAYER':
            return {
                ...state,
               player: undefined
           }
        default:
            return state
    }
}