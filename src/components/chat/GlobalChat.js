import '../styles/GameDetails.css';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getGlobalChat } from '../../store/actions/chatActions';
import { useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

function GlobalChat(props) {    
    const dispatch = useDispatch();
    const globalMessages = useSelector(state => state.chatReducer.globalMessages)
    
    useEffect(() => {         
        dispatch(getGlobalChat(props.gameId));              
    }, [props.gameId, props.playerId, dispatch]) 
    
    const formatTimeStamp = (timeStamp) =>{        
        const options = {hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric' };
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    const onReceiveMessage = gameId => {
        if (gameId === props.gameId) {
            dispatch(getGlobalChat(props.gameId));
        }
    }

    return (
        <div className="chatBox">
            <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL} 
                topics={[
                    "/topic/addChatMessage"
                ]}
                onMessage={ gameId => onReceiveMessage(gameId) }
            />            
        <div>  
            {globalMessages.map(message => <div key={message.id}  id = "message">
                <div id="senderAndTime"><p id ="senderName">{message.senderName}</p> {formatTimeStamp(message.timeStamp)}</div> 
             <div className={props.player.playerName === message.senderName ? 'loggedPlayer' : 'notLoggedPlayer'}>{message.content}</div>
             </div>)}
             <div>           
        </div>   
        </div>    
    
    </div>   
    
    )
}

export default GlobalChat;