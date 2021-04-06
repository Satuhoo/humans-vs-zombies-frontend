import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGameForm from '../forms/AddGameForm';
import { createGame } from '../../store/actions/gameActions';
import { defaultRules } from '../games/defaultRules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { setGameCoordinates } from '../../store/actions/gameActions';
import '../styles/GameList.css';

function AddGame({hideForm, latitude, longitude}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState(defaultRules);
    const [showAlert, setShowAlert] = useState(false);
    const coordinates = useSelector(state => state.gameReducer.coordinates);
    const dispatch = useDispatch();
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleRulesChange = (event) => {
        setRules(event.target.value);
    }

    const addGame = (event) => {
        event.preventDefault();
        //Checks entered values and shows alert if there is empty fields
        if (name === '' || description === '' || rules === '' || coordinates === undefined) {
            setShowAlert(true);
        } else {
            const newGame = {
                name,
                description,
                rules,
                players: [],
                kills: [],
                chat: null,
                latitude: coordinates.lat,
                longitude: coordinates.lng
            }
            dispatch(createGame(newGame));
            hideForm();
            setShowAlert(false);
            //Sets coordinates back to undefined, so location have to set again if adding another game
            dispatch(setGameCoordinates(undefined));
        }
    }

    return (
        <div>
            <Button variant="info" size="sm" onClick={hideForm}>
                <FontAwesomeIcon  className="icon" icon={faAngleLeft}/>
            </Button>
            {showAlert && <Alert className="add-game-alert" variant="danger">
                Something is missing! Please check game details and try again.
            </Alert>}
            <AddGameForm name={name} description={description} rules={rules} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} handleRulesChange={handleRulesChange}
                onSubmit={addGame} buttonText="Create game" latitude={latitude} longitude={longitude}/>
        </div>
    )
}

export default AddGame;