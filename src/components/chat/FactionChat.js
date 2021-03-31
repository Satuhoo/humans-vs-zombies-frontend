import '../styles/GameDetails.css';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getChat } from '../../store/actions/chatActions';
import { useSelector } from 'react-redux';
import MessageForm from '../forms/MessageForm'
import { submitMessage } from '../../store/actions/chatActions';
import { useKeycloak } from '@react-keycloak/web';

function FactionChat(props) {
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chatReducer.messages)
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {              
        dispatch(getChat(props.gameId, keycloak.token));        
    }, [props.gameId, props.playerId, dispatch, keycloak])

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);        
    }
    
    const addMessage = (event) => {
        event.preventDefault();        
        const chatMessage = {
          "content" : newMessage,          
          "globalChat" : false                                    
        }
        dispatch(submitMessage(props.gameId, chatMessage, keycloak.token));         
    }

    return (

        <div className="chatBox">     
            <div>
                <MessageForm gameId = {props.gameId} playerId = {props.playerId}
                newMessage = {newMessage} onSubmit={addMessage} 
                handleMessageChange = {handleMessageChange}></MessageForm>
            </div>      
            <div>  
                {messages.map(message => <div key={message.id}  id = "message">{message.content}</div>)}
            </div>      
        </div>   
    )
}

export default FactionChat;