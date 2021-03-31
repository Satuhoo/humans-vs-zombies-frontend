import Button from 'react-bootstrap/Button';

function MessageForm(props) {
 
    return (
        <div>
        <form onSubmit={props.onSubmit}>
            <div>
                Message: <input onChange={props.handleMessageChange} />
            </div>
            <Button variant="info" type="submit" onSubmit={props.addMessage}>Submit message</Button>
        </form>
    </div>
    )
}

export default MessageForm;