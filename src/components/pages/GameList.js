import Game from '../games/Game';
import { Link } from 'react-router-dom';

function GameList() {
    return (
        <div>
            <h1>Games</h1>
            <Link className="link" to="/games/:id">
                <Game />
            </Link>
        </div>
    )
}

export default GameList;