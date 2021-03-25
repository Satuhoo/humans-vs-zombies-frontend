const initialState = {
    player: {}
}

export function playerReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_PLAYER':
            console.log('action', action)
            console.log('state', {...state})
            return {
                ...state,
                player: action.player
            }
        default:
            return state
    }
}