import Map from '../map/Map';
import GameState from './GameState';
import DeleteGame from '../admin/DeleteGame';
import '../styles/GameDetails.css';

//Shown when game state is complete
function CompletedGame({game, user}) {
    return (
        <div>
            {user.isAdmin && <div className="admin-container">
                <DeleteGame game={game}/>
            </div>}
            <div className="grid-container">
                <div>
                    <h2>{game.name}</h2>
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