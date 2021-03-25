import playerService from "../../services/player.service";

export const addPlayerToGame = (id, player) => {
    return dispatch => {
        playerService.addPlayer(id, player)
        .then(response => {
            dispatch({
                type: 'ADD_PLAYER',
                player: response.data
            })
        })
    }
}