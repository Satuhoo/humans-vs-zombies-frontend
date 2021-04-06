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

    //Calls the redux actions which fetch all games
    //Clears the player and the game from the redux, so it's not holding previous 
    //values if navigating between multiple game details pages
    useEffect(() => {
        dispatch(getGames());
        dispatch(clearPlayer());
        dispatch(clearGame());
    }, [dispatch])

    //Checks the current location of the user
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
        })
    }, [])

    //When game is clicked, navigates to the game details page by the game id
    const handleClickGame = (game) => {
        history.push(`/games/${game.id}`)
    }

    //Hides the add game button and opens the form 
    const handleClickAddGame = () => {
        setShowAddGameButton(false);
    }

    //Hides the form and shows the add game button
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