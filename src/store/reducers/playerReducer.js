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
        case 'UPDATE_PLAYER':
            return {
                ...state,
                players: state.players.map(player => 
                    player.id === action.updatedPlayer.id ? action.updatedPlayer : player
                )
            }
        case 'KILL_PLAYER':
            return {
                ...state,
                player: {
                    ...state.player,
                    kills: state.player.kills.concat(action.kill.victim)
                }
            }
        default:
            return state
    }
}