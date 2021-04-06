import Game from '../games/Game';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getGames, clearGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import AddGame from '../admin/AddGame';
import Button from 'react-bootstrap/Button';
import '../styles/GameList.css';
import { clearPlayer } from '../../store/actions/playerActions';

function GameList() {
    const [showAddGameButton, setShowAddGameButton] = useState(true);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const history = useHistory();
    const games = useSelector(state => state.gameReducer.games);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();

    useEffect(() => {
        dispatch(getGames());
        dispatch(clearPlayer());
        dispatch(clearGame());
    }, [dispatch])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
        })
    }, [])

    const handleClickGame = (game) => {
        history.push(`/games/${game.id}`)
    }

    const handleClickAddGame = () => {
        setShowAddGameButton(false);
    }

    const hideForm = () => {
        setShowAddGameButton(true);
    }

    return (
        <div className="game-list-container">
            <div>
            <h1>Games</h1>
            {games.map((game) => 
                <Game game={game} key={game.id} gameClicked={handleClickGame}/>
            )}
            </div>
            <div>
                {!keycloak.authenticated ? <p className="info-text">Log in to see more game details and play</p>:
                    <div className="info-text">
                        <p>Hello {user.name}!</p>
                    </div>}
                {user.isAdmin && <div>
                    {showAddGameButton ? <Button variant="info" onClick={handleClickAddGame}>Add game</Button>:
                    <AddGame hideForm={hideForm} latitude={currentLatitude} longitude={currentLongitude} /> }
                </div> }
            </div>
        </div>
    )
}

export default GameList;