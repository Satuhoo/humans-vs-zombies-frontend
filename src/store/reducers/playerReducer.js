const initialState = {
    player: {},
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
        default:
            return state
    }
}