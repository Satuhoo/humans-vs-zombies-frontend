import Button from 'react-bootstrap/Button';

function MessageForm(props) {
 
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div id ="messageInput">
                <input placeholder="got something to say?" onChange={props.handleMessageChange} />
                </div>
            <Button id="messageButton" variant="primary" type="submit" onSubmit={props.addMessage}>Send message</Button>
            </form>
        </div>
    )
}

export default MessageForm;