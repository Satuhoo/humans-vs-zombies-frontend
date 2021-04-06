import '../styles/GameDetails.css';
import FactionChat from './FactionChat'
import GlobalChat from './GlobalChat'
import HumanZombieChat from './HumanZombieChat'
import { Tabs, Tab } from 'react-bootstrap';
import { useState } from "react";
import '../styles/GameDetails.css';
import { useDispatch } from 'react-redux';
import { submitGlobalMessage, submitMessage } from '../../store/actions/chatActions';
import { useKeycloak } from '@react-keycloak/web';
import MessageForm from '../forms/MessageForm'
import { useSelector } from 'react-redux';

function ChatBox() {    


    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();    
    const game = useSelector(state => state.gameReducer.game);
    const player = useSelector(state => state.playerReducer.player);
    const user = useSelector(state => state.user);

    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState('');

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);        
    }

    const setSelectedTab = (tab) =>{        
        setActiveTab(tab)          
    }

    const addMessage = (event) => {
         event.preventDefault();         
        const chatMessage = {
          "content" : newMessage,
          "globalChat" : activeTab === "global"                                             
        }        
        if (activeTab === "global")
            dispatch(submitGlobalMessage(game.id, chatMessage, keycloak.token)); 
        else
            dispatch(submitMessage(game.id, chatMessage, keycloak.token)); 
        }

    if (user.isAdmin){
        return (
            <div className = "chat">
                <Tabs transition={false} onSelect={setSelectedTab}>
                    <Tab eventKey="humanAndZombia" title="Human 'n Zombie Chat">
                        <HumanZombieChat gameId={game.id} playerId={player.id} player={player}/>
                    </Tab>
                    <Tab eventKey="global" title="Global Chat">
                        <GlobalChat  gameId={game.id} playerId={player.id} player={player}/>
                    </Tab>       
                </Tabs>
            
                <MessageForm gameId={game.id} layerId={player.id}
                newMessage = {newMessage} onSubmit={addMessage} 
                handleMessageChange = {handleMessageChange}></MessageForm>
            
            </div>
        )

    }else{
        return (
            <div className = "chat">
                <Tabs transition={false} onSelect={setSelectedTab}>
                    <Tab eventKey="faction" title="Faction Chat">
                        <FactionChat gameId={game.id} playerId={player.id} player={player}/>
                    </Tab>
                    <Tab eventKey="global" title="Global Chat">
                        <GlobalChat  gameId={game.id} playerId={player.id} player={player}/>
                    </Tab>       
                </Tabs>
            
                <MessageForm gameId={game.id} layerId={player.id}
                newMessage = {newMessage} onSubmit={addMessage} 
                handleMessageChange = {handleMessageChange}></MessageForm>
            
            </div>
        )
    }
}

export default ChatBox;
