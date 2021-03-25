import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { addPlayerToGame } from '../../store/actions/playerActions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import Chat from '../chat/Chat';
import BiteCodeForm from '../forms/BiteCodeForm';
import Title from '../games/Title';
import Rules from '../games/Rules';
import UpdateGame from '../admin/UpdateGame';



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
        
        <div className="game-details-container">           
            <div>
                {!showEditView ? <Title game={game} registered={registered} handleClickEdit={handleClickEdit}/>: 
                    <UpdateGame game={game} hideForm={hideForm}/> }
                {registered ? <p><br></br>Player id {player.id}</p>: <button onClick={handleRegistration}>Join</button>}
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
    
    )
}

export default GameDetails;