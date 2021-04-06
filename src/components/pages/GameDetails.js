import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { getLoggedPlayer } from '../../store/actions/playerActions';
import { addPlayerToGame, updatePlayer } from '../../store/actions/playerActions';
import { killPlayer } from '../../store/actions/killActions'
import { useDispatch, useSelector } from 'react-redux';
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

function GameDetails(props) {    
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const player = useSelector(state => state.playerReducer.player);
    const user = useSelector(state => state.user);
    const players = useSelector(state => state.playerReducer.players)
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [showEditView, setShowEditView] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [loading, setLoading] = useState(true);
    const { keycloak } = useKeycloak();

    //Calls the redux actions which fetch the game data and players which have registered to it
    useEffect(() => {
        dispatch(getGame(id));
        dispatch(getLoggedPlayer(id, keycloak.token));
        dispatch(getPlayers(id));
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

    if (loading) return null;

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

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    }

    //Creates new kill object and sends it to the redux actions
    const handleBite = (event) => {
        event.preventDefault();
        const kill = {
            'biteCode': biteCode,
            'killerId': player.id
        }

        dispatch(killPlayer(game.id, kill))
        setBiteCode('')
    }

    //When edit button is clicked sets the helper variable to true to shown the update game view
    const handleClickEdit = () => {
        setShowEditView(true);
    }

    //Updates the player's state from human to zombi or opposite, depends on the previous state
    const handlePlayerStateChange = playerItem => {
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

        dispatch(updatePlayer(game.id, changedPlayer))
    }

    //Helper method which hides the edit view
    const hideForm = () => {
        setShowEditView(false);
    }

    if (game.gameState === 'COMPLETE') {
        return (
            <CompletedGame game={game} players={players} user={user}/>
        )
    } else {
        return (
            <div>
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
                        {(registered || user.isAdmin) && <div>
                            <h3>Game state</h3>
                            <GameState game={game}/>
                            <ChatBox/>                         
                        </div>}
                    </div>
                    {/* Checks if user is an admin, if user is registered to the game and the player 
                        state. Shows the right view depending on those*/}
                    {!user.isAdmin ? <div className="grid-item item3">
                        {registered ? <p><br></br>Player id {player.id}</p>: 
                            <GameRegistrationForm playerName={playerName} handlePlayerNameChange={handlePlayerNameChange} 
                                handleRegistration={handleRegistration} />}
                        {registered && !showEditView && 
                                (player.human 
                                    ? <div>Your bite code is <b>{player.biteCode}</b></div>
                                    : <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>
                                )
                        }    
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