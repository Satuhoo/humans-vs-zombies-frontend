import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { getLoggedPlayer } from '../../store/actions/playerActions';
import { addPlayerToGame } from '../../store/actions/playerActions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import Chat from '../chat/Chat';
import BiteCodeForm from '../forms/BiteCodeForm';
import Title from '../games/Title';
import UpdateGame from '../admin/UpdateGame';
import Button from 'react-bootstrap/Button';
import AdminBar from "../admin/AdminBar";
import PlayerList from '../admin/PlayerList';
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
    const { keycloak } = useKeycloak();

    useEffect(() => {
        dispatch(getGame(id));
        dispatch(getLoggedPlayer(id, keycloak.token))
    }, [id, dispatch, keycloak.token])

    useEffect(() => {
        if (player.id !== -1) {
            setRegistered(true);
        } else {
            setRegistered(false)
        }
    }, [player])

    const handleRegistration = (event) => {
        event.preventDefault();
        setRegistered(true);
        dispatch(addPlayerToGame(game.id, keycloak.token));
    }

    const handleBiteCodeChange = (event) => {
        setBiteCode(event.target.value);
    }

    const handleBite = (event) => {
        event.preventDefault();
        console.log('bite');
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
                        <p>{game.gameState}</p>
                        <h3>Chat</h3>
                        <Chat />
                    </div>}
                </div>
                {!user.isAdmin ? <div className="grid-item item3">
                    {registered ? <p><br></br>Player id {player.id}</p>: 
                    <Button variant="info" onClick={handleRegistration}>Join</Button>}
                    {registered && !showEditView && <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>}    
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