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
    
    //Changes the time stamp for more readable form
    const formatTimeStamp = (timeStamp) =>{        
        const options = { hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric', timeZone:'Europe/Helsinki'};
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    // fetch updated data when receiving a relevant websocket message
    const onReceiveMessage = msg => {
        if (msg.gameId === props.gameId) {
            dispatch(getGlobalChat(props.gameId));
        }
    }

    return (
        <div className="chatBox">
            <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL} 
                topics={[
                    "/topic/addChatMessage"
                ]}
                onMessage={ msg => onReceiveMessage(msg) }
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