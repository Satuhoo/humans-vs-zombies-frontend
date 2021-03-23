import Game from '../games/Game';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getGames } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';

function GameList() {
    const history = useHistory();
    const games = useSelector(state => state.gameReducer.games);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGames());
    }, [dispatch])

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