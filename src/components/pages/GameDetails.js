import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/GameDetails.css';
import Map from '../map/Map';
import Chat from '../chat/Chat';
import BiteCodeForm from '../forms/BiteCodeForm';
import Rules from '../games/Rules';

function GameDetails(props) {
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');

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
        console.log('bite')
    }

    return (
        <div className="game-details-container">
            <div>
                <h2>{game.name}</h2>
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                {registered ? <p><br></br>Player state</p>: <button onClick={handleRegistration}>Join</button>}
                {registered && <BiteCodeForm biteCode={biteCode} onSubmit={handleBite} handleBiteCodeChange={handleBiteCodeChange}/>}
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