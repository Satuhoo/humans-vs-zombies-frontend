import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/GameDetails.css';

function BiteCodeForm(props) {
    return (
        <div className="form-container">
            <p className="bite-info-text">Tag a human player to get a bite code</p>
            <Form onSubmit={props.onSubmit}>
                <Form.Control placeholder="Bite code" value={props.biteCode} onChange={props.handleBiteCodeChange} />
                <br/>
                <Form.Control placeholder="Story (optional)" value={props.story} onChange={props.handleStoryChange} maxLength={60}/>
                <br/>
                <Button variant="info" type="submit">Bite</Button>
            </Form>
        </div>
    )
}

export default BiteCodeForm;