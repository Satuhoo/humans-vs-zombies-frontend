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
import { useKeycloak } from '@react-keycloak/web'
import { Redirect } from 'react-router-dom' 


function GameDetails(props) {    
    const { keycloak } = useKeycloak();
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    const [registered, setRegistered] = useState(false);
    const [biteCode, setBiteCode] = useState('');
    const [showEditView, setShowEditView] = useState(false);

    useEffect(() => {
        dispatch(getGame(id));
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
        
        <div className="game-details-container">       
         {!keycloak.authenticated &&
                <div>              
                <Redirect to="/login"/>                
            </div>            
            }             
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
    
    )
}

export default GameDetails;