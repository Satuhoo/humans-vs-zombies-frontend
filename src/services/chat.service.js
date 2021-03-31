import http from '../http-common';


class ChatService {
    getChatMessages(gameId, jwtStr) {
        return http.get(`/games/${gameId}/chat/`, {
            'headers': {'Authorization': 'Bearer ' + jwtStr }}
            )
        }

    getGlobalChatMessages(gameId) {
        return http.get(`/games/${gameId}/chat/global`)
        }
     

    addMessage(gameId, message, jwtStr) {        
        return http.post(`/games/${gameId}/chat/`, message, {
            'headers': {'Authorization': 'Bearer ' + jwtStr }}
            )
        }
}

export default new ChatService();