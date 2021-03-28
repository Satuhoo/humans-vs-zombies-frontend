import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
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

function GameDetails(props) {    
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const player = useSelector(state => state.playerReducer.player);
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [showEditView, setShowEditView] = useState(false);

    useEffect(() => {
        dispatch(getGame(id));
    }, [id, dispatch])

    const handleRegistration = (event) => {
        event.preventDefault();
        setRegistered(true);
        const newPlayer = {
            game_id: game.id
        };
        dispatch(addPlayerToGame(game.id, newPlayer));
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
            {registered && <AdminBar game={game} hideForm={hideForm} showEditView={showEditView}
                handleClickEdit={handleClickEdit} /> }
            <div className="grid-container">
                <div className="grid-item item1">
                {!showEditView ? <Title game={game} registered={registered} handleClickEdit={handleClickEdit}/>: 
                    <UpdateGame game={game} hideForm={hideForm}/> }
                </div>
                <div className="grid-item item2">
                    {registered && <div>
                        <h3>Game state</h3>
                        <p>{game.gameState}</p>
                        <h3>Chat</h3>
                        <Chat />
                    </div>}
                </div>
                <div className="grid-item item3">
                    {registered ? <p><br></br>Player id {player.id}</p>: 
                    <Button variant="info" onClick={handleRegistration}>Join</Button>}
                    {registered && !showEditView && <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>}    
                </div>  
                <div className="grid-item item4">
                    <h3>Location</h3>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default GameDetails;