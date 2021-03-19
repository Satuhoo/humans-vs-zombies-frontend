import { useState, useEffect } from "react";
import GameService from '../../services/game.service';
import Game from '../games/Game';
import UpdateGame from '../admin/UpdateGame';
import AddGame from '../admin/AddGame';
import '../styles/AdminView.css';

function AdministrationView() {
    const [games, setGames] = useState([]);
    const [game, setGame] = useState({});
    const [showUpdateGame, setShowUpdateGame] = useState(false);
    const [showCreateGame, setShowCreateGame] = useState(false);

    useEffect(() => {
        GameService.getAllGames()
        .then(response => setGames(response.data))
    }, [])

    const handleClickGame = (game) => {
        setGame(game);
        setShowCreateGame(false);
        setShowUpdateGame(true);
    }

    const handleClickAddGame = () => {
        setShowUpdateGame(false);
        setShowCreateGame(true);
    }

    const handleGamesChange = (newGameList) => {
        setGames(newGameList);
        setShowCreateGame(false);
        setShowUpdateGame(false);
    }

    return (
        <div className="admin-container">
            <div>
                <h1>Administration view</h1>
                {showUpdateGame && <UpdateGame game={game} games={games} handleGamesChange={handleGamesChange}/>}
                {showCreateGame && <AddGame games={games} handleGamesChange={handleGamesChange}/>}
                <button onClick={handleClickAddGame}>Add game</button>
            </div>
            <div>
                {games.map((game) => 
                    <Game key={game.id} game={game} gameClicked={handleClickGame}>{game.name}</Game>
                )}
            </div>
        </div>
    )
}

export default AdministrationView;