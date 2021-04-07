const initialState = {}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return {}
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state
    }
}