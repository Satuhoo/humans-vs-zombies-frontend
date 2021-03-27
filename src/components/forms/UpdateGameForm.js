import '../styles/GameDetails.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateGameForm(props) {
    return (
        <Form className="update-form" onSubmit={props.onSubmit}>
            <Form.Control value={props.name} onChange={props.handleNameChange}/>
            <h3>Description</h3>
            <Form.Control value={props.description} onChange={props.handleDescriptionChange}/>
            <br/>
            <Button variant="info" className="update-btn" type="submit">Update</Button>
        </Form>
    )
}

export default UpdateGameForm;