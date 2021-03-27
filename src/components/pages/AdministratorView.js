import { useState, useEffect } from "react";
import Game from '../games/Game';
import UpdateGame from '../admin/UpdateGame';
import AddGame from '../admin/AddGame';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../store/actions/gameActions';
import Button from 'react-bootstrap/Button';
import '../styles/AdminView.css';

function AdministrationView() {
    const games = useSelector(state => state.gameReducer.games);
    const [game, setGame] = useState({});
    const [showUpdateGame, setShowUpdateGame] = useState(false);
    const [showCreateGame, setShowCreateGame] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGames());
    }, [dispatch])

    const handleClickGame = (game) => {
        setGame(game);
        setShowCreateGame(false);
        setShowUpdateGame(true);
    }

    const handleClickAddGame = () => {
        setShowUpdateGame(false);
        setShowCreateGame(true);
    }

    const hideForm = () => {
        setShowCreateGame(false);
        setShowUpdateGame(false);
    }

    return (
        <div className="admin-container">
            <div>
                <h1>Administration view</h1>
                {showUpdateGame && <UpdateGame game={game} hideForm={hideForm}/>}
                {showCreateGame && <AddGame hideForm={hideForm}/>}
                <Button variant="info" onClick={handleClickAddGame}>Add game</Button>
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