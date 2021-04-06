import '../styles/GameDetails.css';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getChat } from '../../store/actions/chatActions';
import { useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';

function HumanZombieChat(props) {
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chatReducer.messages)   
    console.log(messages) 

    useEffect(() => {              
        dispatch(getChat(props.gameId, keycloak.token));     
    }, [props.gameId, props.playerId, dispatch, keycloak])

    const formatTimeStamp = (timeStamp) =>{        
        const options = { hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric'};
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    return (

        <div className="chatBox">          
        <div>  
            {messages.map(message => <div key={message.id}  id = "message">
                <div id="senderAndTime"><p id ="senderName">{message.senderName} {message.humanChat ? '(human)' : '(zombie)'}</p> {formatTimeStamp(message.timeStamp)}</div> 
             <div className={message.humanChat ? 'humanMessage' : 'zombieMessage'}>{message.content}</div>
             </div>)}
             <div>           
        </div>   
        </div>    
    
    </div>   
    )
}

export default HumanZombieChat;