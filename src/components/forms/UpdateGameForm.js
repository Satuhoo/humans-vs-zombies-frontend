import '../styles/GameDetails.css';
import Form from 'react-bootstrap/Form';

function UpdateGameForm(props) {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Control size="lg" value={props.name} onChange={props.handleNameChange}/>
            <h3>Description</h3>
            <Form.Control as="textarea" rows={3} className="description-input" value={props.description} onChange={props.handleDescriptionChange}/>
            <h3>Game state</h3>
            <Form.Control as="select" onChange={props.handleGameStateChange}>
                <option>REGISTRATION</option>
                <option>IN_PROGRESS</option>
                <option>COMPLETE</option>
            </Form.Control>
            <button type="submit">Update</button>
        </Form>
    )
}

export default UpdateGameForm;