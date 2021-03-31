import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GameForm from '../forms/GameForm';
import { createGame } from '../../store/actions/gameActions';
import defaultRules from '../games/defaultRules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

function AddGame({hideForm}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState(defaultRules);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, [])
    
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
        const newGame = {
            name,
            description,
            rules,
            players: [],
            kills: [],
            chat: null,
            latitude,
            longitude
        }
        dispatch(createGame(newGame));
        hideForm();
    }

    return (
        <div>
            <Button variant="info" size="sm" onClick={hideForm}>
                <FontAwesomeIcon  className="icon" icon={faAngleLeft}/>
            </Button>
            <GameForm name={name} description={description} rules={rules} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} handleRulesChange={handleRulesChange}
                onSubmit={addGame} buttonText="Create game"/>
        </div>
    )
}

export default AddGame;