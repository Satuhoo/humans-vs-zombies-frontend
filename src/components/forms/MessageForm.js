import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

function MessageForm(props) {
    if (props.isAdmin === true && props.activeTab !== 'global'){
    return null
    }else{    
        return (
            <div >
                <Form onSubmit={props.onSubmit}>
                    <div id ="messageInput">
                        <Form.Control className="message-input-field" placeholder="got something to say?" value={props.newMessage} 
                            maxLength={255} onChange={props.handleMessageChange} />
                        <Button id="messageButton" variant="info" size="sm" type="submit" onSubmit={props.addMessage}>
                            <FontAwesomeIcon  className="icon" icon={faArrowRight}/>
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default MessageForm;