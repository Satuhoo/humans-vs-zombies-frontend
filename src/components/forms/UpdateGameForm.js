import '../styles/GameDetails.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

//Shows the input fields with previous values, sets maximum lengths for them
function UpdateGameForm(props) {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Row>
                <Col>
                    <h2>{props.name}</h2>
                    <Form.Control maxLength={30} value={props.name} onChange={props.handleNameChange}/>
                    <h3>Description</h3>
                    <Form.Control as="textarea" rows={3} maxLength={255}
                        value={props.description} onChange={props.handleDescriptionChange}/>
                </Col>
                <Col md={7} xs={20}>
                    <h3>Rules</h3>
                    <Form.Control as="textarea" rows={5} maxLength={255}
                        value={props.rules} onChange={props.handleRulesChange}/>
                    <Button variant="info" className="update-btn" type="submit">Update</Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default UpdateGameForm;