import '../styles/GameDetails.css';
import FactionChat from './FactionChat'
import GlobalChat from './GlobalChat'
import { Tabs, Tab } from 'react-bootstrap';

function ChatBox(props) {
    
    return (
        <div className = "chat">
            <Tabs defaultActiveKey ="Faction Chat" transition={false}>
                <Tab eventKey="faction" title="Faction Chat">
                    <FactionChat gameId={props.gameId} playerId={props.playerId} player={props.player}/>
                </Tab>
                <Tab eventKey="global" title="Global Chat">
                    <GlobalChat gameId={props.gameId} playerId={props.playerId} player={props.player}/>
                </Tab>       
            </Tabs>
        </div>
    )
}

export default ChatBox;
