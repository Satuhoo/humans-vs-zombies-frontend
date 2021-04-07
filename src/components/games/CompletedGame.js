import Map from '../map/Map';
import GameState from './GameState';
import DeleteGame from '../admin/DeleteGame';
import { useSelector } from 'react-redux';
import '../styles/GameDetails.css';

//Shown when game state is complete
function CompletedGame({game, user}) {
    const kills = useSelector(state => state.gameReducer.kills);
    const players = useSelector(state => state.playerReducer.players);

    return (
        <div>
            {user.isAdmin && <div className="admin-container">
                <DeleteGame game={game}/>
            </div>}
            <div className="grid-container">
                <div>
                    <h2>{game.name}</h2>
                    <br/>
                    <p>Players in the game: {players.length}</p>
                    <p>Kills in the game: {kills.length}</p>
                </div>
                <div>
                    <Map game={game}/>
                </div>
                <div>
                    <h3>Game state</h3>
                    <GameState game={game}/>
                </div>
            </div>
        </div>
    )
}

export default CompletedGame;