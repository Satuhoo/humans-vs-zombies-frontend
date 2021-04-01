import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { getLoggedPlayer } from '../../store/actions/playerActions';
import { addPlayerToGame } from '../../store/actions/playerActions';
import { killPlayer } from '../../store/actions/killActions'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import ChatBox from '../chat/ChatBox';
import BiteCodeForm from '../forms/BiteCodeForm';
import Title from '../games/Title';
import UpdateGame from '../admin/UpdateGame';
import GameRegistrationForm from '../forms/GameRegistrationForm';
import AdminBar from "../admin/AdminBar";
import PlayerList from '../admin/PlayerList';
import GameState from '../games/GameState';
import { useKeycloak } from '@react-keycloak/web';

function GameDetails(props) {    
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const player = useSelector(state => state.playerReducer.player);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [showEditView, setShowEditView] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [loading, setLoading] = useState(true);
    const [gameState, setGameState] = useState('');
    const { keycloak } = useKeycloak();

    useEffect(() => {
        dispatch(getGame(id));
        dispatch(getLoggedPlayer(id, keycloak.token))
    }, [id, dispatch, keycloak.token])

    useEffect(() => {
        if (game !== undefined && player !== undefined) {
            setGameState();
            if (player.id !== -1) {
                setRegistered(true);
            } else {
                setRegistered(false);
            }
            setLoading(false);
        }
    }, [game, player])

    useEffect(() => {
        if (game !== undefined) {
            if (game.gameState === 'REGISTRATION') {
                setGameState('Registration')
            } else if (game.gameState === 'IN_PROGRESS') {
                setGameState('In progress')
            } else {
                setGameState('Game is finished')
            }
        }
    }, [game, gameState])

    if (loading) return null;

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
        console.log(event.target.value)
        setPlayerName(event.target.value);
    }

    const handleBite = (event) => {
        event.preventDefault();

        const kill = {
            'biteCode': biteCode,
            'killerId': player.id
        }

        dispatch(killPlayer(game.id, kill))
        setBiteCode('')
    }

    const handleClickEdit = () => {
        setShowEditView(true);
    }

    const hideForm = () => {
        setShowEditView(false);
    }

    return (
        <div>
            {user.isAdmin && <AdminBar game={game} hideForm={hideForm} showEditView={showEditView}
                handleClickEdit={handleClickEdit} /> }
            <div className="grid-container">
                <div className="grid-item item1">
                {!showEditView ? <Title game={game} registered={registered} handleClickEdit={handleClickEdit}/>: 
                    <UpdateGame game={game} hideForm={hideForm}/> }
                </div>
                <div className="grid-item item2">
                    {(registered || user.isAdmin) && <div>
                        <h3>Game state</h3>
                        <GameState game={game}/>
                         <ChatBox gameId={id} playerId={player.id} player={player}/>                         
                    </div>}
                </div>
                {!user.isAdmin ? <div className="grid-item item3">
                    {registered ? <p><br></br>Player id {player.id}</p>: 
                        <GameRegistrationForm playerName={playerName} handlePlayerNameChange={handlePlayerNameChange} 
                            handleRegistration={handleRegistration} />}
                    {registered && !showEditView && 
                            (
                                player.human 
                                ? <div>Your bite code is <b>{player.biteCode}</b></div>
                                : <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>
                            )
                    }    
                </div>
                : <PlayerList gameId={id}/> }  
                <div className="grid-item item4">
                    <h3>Location</h3>
                    
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default GameDetails;