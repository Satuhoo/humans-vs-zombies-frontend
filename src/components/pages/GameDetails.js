import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import Chat from '../chat/Chat';
import BiteCodeForm from '../forms/BiteCodeForm';
import Title from '../games/Title';
import Rules from '../games/Rules';
import UpdateGame from '../admin/UpdateGame';
import UpdateGameState from '../admin/UpdateGameState';
import DeleteGame from '../admin/DeleteGame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

function GameDetails(props) {
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [showEditView, setShowEditView] = useState(false);

    useEffect(() => {
        dispatch(getGame(id));
        //TODO: check if the player is registered to the game
    }, [id, dispatch])

    const handleRegistration = () => {
        setRegistered(true);
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
            <div className="admin-grid-container">
            <div>
                {showEditView && <button onClick={hideForm}><FontAwesomeIcon  className="icon" icon={faAngleLeft}/></button>}
            </div>
            <div>
                {registered && <UpdateGameState game={game}/>}
            </div>
                {showEditView && <DeleteGame game={game}/>}
            </div>
            <div className="game-details-container">
            <div>
                {!showEditView ? <Title game={game} registered={registered} handleClickEdit={handleClickEdit}/>: 
                    <UpdateGame game={game} hideForm={hideForm}/> }
                {registered ? <p><br></br>Player state</p>: <button onClick={handleRegistration}>Join</button>}
                {registered && !showEditView && <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>}
            </div>
            <div>
                <Rules />
                <h3>Location</h3>
                <Map />
            </div>
            {registered && <div className="chat-container">
                <h3>Chat</h3>
                <Chat />
            </div>}
        </div>
        </div>
    )
}

export default GameDetails;