import '../styles/GameDetails.css';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getGlobalChat } from '../../store/actions/chatActions';
import { useSelector } from 'react-redux';
import MessageForm from '../forms/MessageForm'
import { submitGlobalMessage } from '../../store/actions/chatActions';
import { useKeycloak } from '@react-keycloak/web';

function GlobalChat(props) {
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();
    const globalMessages = useSelector(state => state.chatReducer.globalMessages)
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {         
        dispatch(getGlobalChat(props.gameId));              
    }, [props.gameId, props.playerId, dispatch])

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);        
    }
    

    const addMessage = (event) => {
        event.preventDefault();        
        const chatMessage = {
          "content" : newMessage,
          "globalChat" : true                                              
        }
        dispatch(submitGlobalMessage(props.gameId, chatMessage, keycloak.token)); 
    }

    const formatTimeStamp = (timeStamp) =>{        
        const options = {  hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric' };
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    return (
        <div className="chatBox">     
        <div>
            <MessageForm gameId = {props.gameId} playerId = {props.playerId}
            newMessage = {newMessage} onSubmit={addMessage} 
            handleMessageChange = {handleMessageChange}></MessageForm>
        </div>      
        <div>  
            {globalMessages.map(message => <div key={message.id}  id = "message"><div id="senderName">{message.senderName}</div> 
             <div id="messageContent">{message.content}</div>
             <div id="timeStamp">{formatTimeStamp(message.timeStamp)}</div> </div>)}
        </div>      
    </div>   
    )
}

export default GlobalChat;