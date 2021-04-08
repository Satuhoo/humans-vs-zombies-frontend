import '../styles/GameDetails.css';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getChat } from '../../store/actions/chatActions';
import { useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import SockJsClient from 'react-stomp';

function FactionChat(props) {
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chatReducer.messages)    

    useEffect(() => {              
        dispatch(getChat(props.gameId, keycloak.token));     
    }, [props.gameId, props.playerId, dispatch, keycloak])

    const formatTimeStamp = (timeStamp) =>{        
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = { hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric', timeZone:tz};
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    const onReceiveMessage = msg => {
        if (msg.gameId === props.gameId) {
            dispatch(getChat(props.gameId, keycloak.token));
        }
    }

    return (

        <div className="chatBox">  
            <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL}
                topics={[
                    "/topic/addChatMessage",
                    "/topic/addKill",
                    "/topic/updatePlayer"
                ]}
                onMessage={ msg => onReceiveMessage(msg) }
            />                
        <div>  
            {messages.map(message => <div key={message.id}  id = "message">
                <div id="senderAndTime"><p id ="senderName">{message.senderName}</p> {formatTimeStamp(message.timeStamp)}</div> 
             <div className={props.player.playerName === message.senderName ? 'loggedPlayer' : 'notLoggedPlayer'}>{message.content}</div>
             </div>)}
             <div>           
        </div>   
        </div>    
    
    </div>   
    )
}

export default FactionChat;