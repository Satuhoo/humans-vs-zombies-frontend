import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { getLoggedPlayer } from '../../store/actions/playerActions';
import { addPlayerToGame, updatePlayer } from '../../store/actions/playerActions';
import { killPlayer, clearError } from '../../store/actions/killActions'
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import ChatBox from '../chat/ChatBox';
import BiteCodeForm from '../forms/BiteCodeForm';
import Details from '../games/Details';
import UpdateGame from '../admin/UpdateGame';
import GameRegistrationForm from '../forms/GameRegistrationForm';
import AdminBar from "../admin/AdminBar";
import PlayerList from '../admin/PlayerList';
import GameState from '../games/GameState';
import CompletedGame from '../games/CompletedGame';
import { useKeycloak } from '@react-keycloak/web';
import { getPlayers } from '../../store/actions/playerActions';
import { confirmAlert } from 'react-confirm-alert';
import { resetErrors } from "../../store/actions/errorActions";
import Spinner from 'react-bootstrap/Spinner';

function GameDetails(props) {    
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const player = useSelector(state => state.playerReducer.player);
    const user = useSelector(state => state.user);
    const players = useSelector(state => state.playerReducer.players)
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [story, setStory] = useState('');
    const [showEditView, setShowEditView] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [loading, setLoading] = useState(true);
    const { keycloak } = useKeycloak();

    //Calls the redux actions which fetch the game data and players which have registered to it
    useEffect(() => {
        dispatch(getGame(id));
        dispatch(getLoggedPlayer(id, keycloak.token));
        dispatch(getPlayers(id, keycloak.token));

        // Clear error messages when the component is unmounted
        return (() => {
            dispatch(resetErrors())
        })
    }, [id, dispatch, keycloak.token])

    //Checks if the component is already loaded the needed data
    useEffect(() => {
        if (game !== undefined && player !== undefined) {
            //Checks if the current user has already registered in the game
            if (player.id !== -1) {
                setRegistered(true);
            } else {
                setRegistered(false);
            }
            setLoading(false);
        }
    }, [game, player])

    if (loading) return (
        <div className="spinner">
            <p>Loading the data</p>
            <Spinner  animation="border" variant="warning" />
        </div>
    ) 


    //Registers the user to the game and create new player
    const handleRegistration = (event) => {
        event.preventDefault();
        setRegistered(true);
        const newPlayer = {
            playerName: playerName
        }
        dispatch(addPlayerToGame(game.id, newPlayer, keycloak.token));
    }

    const handleBiteCodeChange = (event) => {
        setBiteCode(event.target.value);
    }

    const handleStoryChange = (event) => {
        setStory(event.target.value);
    }

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    }

    //Creates new kill object and sends it to the redux actions
    const handleBite = (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(function(position) {
            const kill = {
                'biteCode': biteCode,
                'killerId': player.id,
                'story': story,
                'lat': position.coords.latitude,
                'lng': position.coords.longitude
            }
            dispatch(killPlayer(game.id, kill));
            setBiteCode('');
            setStory('');
        })
        setTimeout(function(){
            dispatch(clearError()); 
        }, 4000);

    }

    //When edit button is clicked sets the helper variable to true to shown the update game view
    const handleClickEdit = () => {
        setShowEditView(true);
    }

    //Updates the player's state from human to zombi or opposite, depends on the previous state
    const handlePlayerStateChange = playerItem => {
        confirmAlert({
            title: 'Turn player',
            message: `Are you sure to turn ${playerItem.playerName} into a ${playerItem.human ? 'zombi' : 'human'}`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const changedPlayer = {
                        ...playerItem,
                        game: {
                            ...game,
                            players: [],
                            kills: [],
                            chat: null
                        },
                        messages: [],
                        kills: [],
                        human: !playerItem.human,
                        victimOf: null
                    }
                    dispatch(updatePlayer(game.id, changedPlayer, keycloak.token))
                }
              },
              {
                label: 'No',
              }
            ]
          });
    }

    //Helper method which hides the edit view
    const hideForm = () => {
        setShowEditView(false);
    }

    const onReceiveMessage = msg => {
        if (String(msg.gameId) === id) {
            dispatch(getGame(id))
            dispatch(getLoggedPlayer(id, keycloak.token))
            dispatch(getPlayers(id, keycloak.token))
            dispatch(resetErrors())
        }

        if (msg.type === "ADD_KILL" && msg.victimId === player.id) {
            confirmAlert({
                message:  `Uh-oh, you were turned into a zombie by ${msg.killerName}!${msg.story ? ` Story: "${msg.story}"` : ''}`,
                buttons: [{label: 'Ok'}]
            });
        }
    }

    if (game.gameState === 'COMPLETE') {
        return (
            <div>
                <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL} 
                    topics={[
                        "/topic/deleteGame"
                    ]}
                    onMessage={ msg => onReceiveMessage(msg) }
                />
                <CompletedGame game={game} players={players} user={user}/>
            </div>
        )
    } else {
        return (
            <div>
                <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL}
                    topics={[
                        "/topic/updateGame",
                        "/topic/deleteGame",
                        "/topic/addPlayer",
                        "/topic/updatePlayer",
                        "/topic/deletePlayer",
                        "/topic/addKill"
                    ]}
                    onMessage={ gameId => onReceiveMessage(gameId) }
                />
                {/* Shows the admin bar for the user's with admin role */}
                {user.isAdmin && <AdminBar game={game} hideForm={hideForm} showEditView={showEditView}
                    handleClickEdit={handleClickEdit} /> }
                <div className="grid-container">
                    <div className="grid-item item1">
                    {/* Shows the game details as a text or as a form if the edit button is clicked */}
                    {!showEditView ? <Details game={game} registered={registered} handleClickEdit={handleClickEdit}/>: 
                        <UpdateGame game={game} hideForm={hideForm}/> }
                    </div>
                    <div className="grid-item item2">
                        {/* Shows the game state and chat for registered users and for admin */}
                        <div>
                        <h3>Game state</h3>
                            <GameState game={game}/>
                        {(registered || user.isAdmin) && 
                            <ChatBox/>} 
                        </div>
                    </div>
                    {/* Checks if user is an admin, if user is registered to the game and the player 
                        state. Shows the right view depending on those*/}
                    {!user.isAdmin ? <div className="grid-item item3">
                        {!registered && game.gameState === 'REGISTRATION' &&
                            <GameRegistrationForm playerName={playerName} handlePlayerNameChange={handlePlayerNameChange} 
                                handleRegistration={handleRegistration} />}
                        {registered && game.gameState === 'IN_PROGRESS' ? <div>
                            <p>You are a <b>{player.human ? 'human' : 'zombie'}</b></p>
                            {player.human 
                                ? <div>Your bite code is <b>{player.biteCode}</b></div>
                                : <BiteCodeForm biteCode={biteCode} story={story} onSubmit={handleBite} 
                                handleBiteCodeChange={handleBiteCodeChange} handleStoryChange={handleStoryChange}/>
                            }
                        </div>: 
                        <p>Game is not started yet</p>}    
                    </div>
                    : <PlayerList gameId={id} handlePlayerStateChange={handlePlayerStateChange} /> }  
                    <div className="grid-item item4">
                        <h3>Location</h3>
                        <Map game={game}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameDetails;