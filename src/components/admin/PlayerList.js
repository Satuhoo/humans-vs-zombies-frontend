import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Player from './Player'
import { getPlayers } from '../../store/actions/playerActions';

function PlayerList({gameId, handlePlayerStateChange}) {
    const dispatch = useDispatch();
    const players = useSelector(state => state.playerReducer.players)

    useEffect(() => {
        dispatch(getPlayers(gameId));
    }, [dispatch, gameId])

    return (
        <div>
            <h3>Players</h3>
            {players.map((player) => 
                <Player key={player.id} player={player} handlePlayerStateChange={handlePlayerStateChange} />
            )}
        </div>
    )
}

export default PlayerList;