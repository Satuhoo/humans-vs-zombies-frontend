import chatService from "../../services/chat.service";

export const getChat = (id, jwtStr) => {
    return dispatch => {
        chatService.getChatMessages(id, jwtStr)
        .then(response => {
            dispatch({
                type: 'GET_CHAT',
                messages: response.data
            })
        }).catch(err => {
            console.log(err)
        });
    };    
}

export const submitGlobalMessage = (gameId, message, jwtStr) => {    
    return dispatch => {
        chatService.addMessage(gameId, message, jwtStr)
        .then(response => {
            dispatch({
                type: 'ADD_GLOBAL_MESSAGE',
                newMessage: response.data
            })
        });
    }
}

export const submitMessage = (gameId, message, jwtStr) => {    
    return dispatch => {
        chatService.addMessage(gameId, message, jwtStr)
        .then(response => {
            dispatch({
                type: 'ADD_FACTION_MESSAGE',
                newMessage: response.data
            })
        });
    }
}

export const getGlobalChat = id => {
    return dispatch => {
        chatService.getGlobalChatMessages(id)
        .then(response => {
            dispatch({
                type: 'GET_GLOBAL_CHAT',
                globalMessages: response.data
            })
        }).catch (err => {
            console.log(err)
        });
    };    
}


