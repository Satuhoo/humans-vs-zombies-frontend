import '../styles/GameList.css';
import GameState from './GameState';

function Game({game, gameClicked}) {
    //Calls the method in the game list component when game is clicked
    const handleClickGame = () => {
        gameClicked(game)
    }

    return (
        <div className="game-card" onClick={handleClickGame}>
            <div>
                <h2>{game.name}</h2>
                <p>{game.description}</p>
            </div>
            <div>
                <GameState game={game}/>
                <p> Players: {game.players.length}</p>
            </div>
        </div>
    )
}

export default Game;