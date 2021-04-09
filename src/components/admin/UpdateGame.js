import { useState } from 'react';
import UpdateGameForm from '../forms/UpdateGameForm';
import { useDispatch } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';
import { useKeycloak } from '@react-keycloak/web';
import { Alert } from 'react-bootstrap';

function UpdateGame({game, hideForm}) {
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description);
    const [rules, setRules] = useState(game.rules);    
    const [gameState, setGameState] = useState(game.gameState);   
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak(); 
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleRulesChange = (event) => {
        setRules(event.target.value);
    }

    const handleGameStateChange = (event) => {
        setGameState(event.target.value)
    }

    const updateGame = (event) => {
        event.preventDefault();   
        //Checks entered values and shows alert if there is empty fields
        if (name === '' || description === '' || rules === '') {
            setShowAlert(true);
        } else {   
            const updatedGame = {  
                'id' : game.id,
                'name' : name,
                'description' : description,
                'rules' : rules,
                'gameState' : gameState,          
            }        
            dispatch(updateGameById(updatedGame, keycloak.token));
            hideForm();
        }
    }

    return (
        <div>
            {showAlert && <Alert className="add-game-alert" variant="danger">
                Something is missing! Please check game details and try again.
            </Alert>}
            <UpdateGameForm name={name} description={description} handleNameChange={handleNameChange}
                rules={rules} handleRulesChange={handleRulesChange}
                handleDescriptionChange={handleDescriptionChange} handleGameStateChange={handleGameStateChange}
                onSubmit={updateGame} buttonText="Update game"/>
        </div>
    )
}

export default UpdateGame;