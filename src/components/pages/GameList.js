import Game from '../games/Game';
import GameService from '../../services/game.service';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function GameList() {
    const [games, setGames] = useState([]);
    const history = useHistory();

    useEffect(() => {
        GameService.getAllGames()
        .then(response => setGames(response.data))
    }, [])

    const handleClickGame = (game) => {
        history.push(`/games/${game.id}`)
    }

    return (
        <div>
            <h1>Games</h1>
            {games.map((game) => 
                <Game game={game} key={game.id} gameClicked={handleClickGame}/>
            )}
        </div>
    )
}

export default GameList;