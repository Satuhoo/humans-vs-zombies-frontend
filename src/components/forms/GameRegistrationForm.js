import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GameRegistrationForm({playerName, handlePlayerNameChange, handleRegistration}) {
    return (
        <Form className="form-container" onSubmit={handleRegistration}>
            <Form.Label className="form-label">Your player name</Form.Label>
            <Form.Control value={playerName} onChange={handlePlayerNameChange} />
            <br/>
            <Button variant="info">Join</Button>
        </Form>
    )
}

export default GameRegistrationForm;