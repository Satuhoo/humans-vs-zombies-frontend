import { useSelector } from 'react-redux';
import Player from './Player'

function PlayerList({handlePlayerStateChange}) {
    const players = useSelector(state => state.playerReducer.players)

    return (
        <div>
            <h3>Players</h3>
            <div className="player-list">
                {players.map((player) => 
                    <Player key={player.id} player={player} handlePlayerStateChange={handlePlayerStateChange} />
                )}
            </div>
        </div>
    )
}

export default PlayerList;