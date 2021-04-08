import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import '../styles/GameDetails.css';

function BiteCodeForm(props) {
    const biteCodeError = useSelector(state => state.error)

    return (
        <div className="form-container">
            <p className="bite-info-text">Tag a human player to get a bite code</p>
            {biteCodeError.error && 
                <Alert variant="danger">
                    The kill was not successful. Please check that the bite code is correct.
                </Alert>
            }
            <Form onSubmit={props.onSubmit}>
                <Form.Control placeholder="Bite code" value={props.biteCode} onChange={props.handleBiteCodeChange} required />
                <br/>
                <Form.Control placeholder="Story (optional)" value={props.story} onChange={props.handleStoryChange} maxLength={60}/>
                <br/>
                <Button variant="info" type="submit">Bite</Button>
            </Form>
        </div>
    )
}

export default BiteCodeForm;