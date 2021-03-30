import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../../store/actions/playerActions';

function PlayerList({gameId}) {
    const dispatch = useDispatch();
    const players = useSelector(state => state.playerReducer.players)

    useEffect(() => {
        dispatch(getPlayers(gameId));
    }, [dispatch, gameId])

    return (
        <div>
            {players.map((player) => 
                <p key={player.id}>{player.id} </p>
            )}
        </div>
    )
}

export default PlayerList;