const initialState = {    
    messages: [],
    globalMessages:[],
    newMessage : {},
}

export function chatReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_CHAT':
            return {
                ...state,
                messages: action.messages
            }
            case 'ADD_GLOBAL_MESSAGE':
                return {
                    ...state,
                    globalMessages: [...state.globalMessages, action.newMessage]
                }
            case 'ADD_FACTION_MESSAGE':
                return {
                    ...state,
                    messages: [...state.messages, action.newMessage]
                }
            case 'GET_GLOBAL_CHAT':
                return {
                    ...state,
                    globalMessages: action.globalMessages
                }
        default:
            return state
    }
}