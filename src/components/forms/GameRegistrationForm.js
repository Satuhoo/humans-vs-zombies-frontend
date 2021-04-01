import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GameRegistrationForm({playerName, handlePlayerNameChange, handleRegistration}) {
    return (
        <div>
            <Form.Label className="form-label">Player name</Form.Label>
                <Form.Control value={playerName} onChange={handlePlayerNameChange} />
            <Button variant="info" onClick={handleRegistration}>Join</Button>
        </div>
    )
}

export default GameRegistrationForm;