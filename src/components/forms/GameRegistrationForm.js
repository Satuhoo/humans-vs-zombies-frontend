import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GameRegistrationForm({playerName, handlePlayerNameChange, handleRegistration}) {
    return (
        <div className="form-container">
            <Form.Label className="form-label">Your player name</Form.Label>
            <Form.Control value={playerName} onChange={handlePlayerNameChange} />
            <br/>
            <Button variant="info" onClick={handleRegistration}>Join</Button>
        </div>
    )
}

export default GameRegistrationForm;