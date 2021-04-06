import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AdminMap from '../map/AdminMap';
import '../styles/GameList.css';

//Shows the input fields and map to help to the setting coordinates. 
//Sets maximum lengths for values
function AddGameForm(props) {
    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control value={props.name} onChange={props.handleNameChange} maxLength={30}/>
                <Form.Label size="lg">Description</Form.Label>
                <Form.Control as="textarea" rows={3} maxLength={255} value={props.description} 
                        onChange={props.handleDescriptionChange} />
                <Form.Label size="lg">Rules</Form.Label>
                <Form.Control as="textarea" rows={5} maxLength={255} value={props.rules} 
                        onChange={props.handleRulesChange} />
                <Form.Label size="lg">Location</Form.Label>
                <p>Choose the game location by clicking the map</p>
                <AdminMap latitude={props.latitude} longitude={props.longitude}/>
                <br/>
                <Button variant="info" type="submit">{props.buttonText}</Button>
            </Form>
        </div>
    )
}

export default AddGameForm;