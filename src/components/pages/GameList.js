import Game from '../games/Game';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getGames, clearGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import SockJsClient from 'react-stomp';
import AddGame from '../admin/AddGame';
import Button from 'react-bootstrap/Button';
import '../styles/GameList.css';
import { clearPlayer } from '../../store/actions/playerActions';
import { overview } from '../games/defaultRules';
import { setUserName } from '../../store/actions/userActions';

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

    //Checks if there is not user's name in the redux and fetchs it from keycloak if not
    useEffect(() => {
        if (user.name === undefined) {
            keycloak.loadUserInfo()
            .then(currentUser => {
                dispatch(setUserName(currentUser.given_name))
            })
        } 
    }, [user.name, keycloak, dispatch])

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

    const onReceiveMessage = () => {
        dispatch(getGames())
    }

    return (
        <div>
            <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL}
                topics={[
                    "/topic/addGame",
                    "/topic/updateGame",
                    "/topic/deleteGame",
                    "/topic/addPlayer",
                    "/topic/deletePlayer"
                ]}
                onMessage={ () => onReceiveMessage() }
            />
            <div className="game-list-container">
                <div>
                <h1>Games</h1>
                {games.map((game) => 
                    <Game game={game} key={game.id} gameClicked={handleClickGame}/>
                )}
                </div>
                <div>
                    {!keycloak.authenticated ? 
                        <p className="info-text">Log in to see more details and play the game!</p> :
                        <div>
                            {showAddGameButton ? <div className="add-game-container">
                                <div>
                                {user.name !== undefined && <p className="username">Hello {user.name}!</p>}
                                </div>
                                {user.isAdmin && <div>
                                    {showAddGameButton && <Button className="add-game-btn" variant="info" size="sm" onClick={handleClickAddGame}>
                                        Add new game</Button>}
                                </div>}
                            </div>:
                            <AddGame hideForm={hideForm} latitude={currentLatitude} longitude={currentLongitude} />}
                        </div>}
                    <br/>
                    {showAddGameButton && <div className="overview">
                        <h5>Game overview</h5>
                        <p>{overview}</p>
                        <p>See the specific rules by register to the game.</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default GameList;