import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GameForm(props) {
    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control value={props.name} onChange={props.handleNameChange} />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.description} 
                        onChange={props.handleDescriptionChange} />
                <Form.Label>Rules</Form.Label>
                <Form.Control as="textarea" rows={5}  value={props.rules} 
                        onChange={props.handleRulesChange} />
                <Button variant="info" type="submit">{props.buttonText}</Button>
            </Form>
        </div>
    )
}

export default GameForm;