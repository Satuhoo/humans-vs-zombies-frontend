import { useState } from 'react';
import UpdateGameForm from '../forms/UpdateGameForm';
import { useDispatch } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';

function UpdateGame({game, hideForm}) {
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description);
    const [rules, setRules] = useState(game.rules);
    const [gameState, setGameState] = useState(game.gameState);
    const dispatch = useDispatch();
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleRulesChange = (event) => {
        setRules(event.target.value);
    }

    const handleGameStateChange = (event) => {
        console.log(event.target.value)
        setGameState(event.target.value)
    }

    const updateGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            'id' : game.id,
            'name' : name,
            'description' : description,
            'rules' : rules,
            'gameState' : gameState   
        }
        dispatch(updateGameById(updatedGame));
        hideForm();
    }

    return (
        <div>
            <UpdateGameForm name={name} description={description} handleNameChange={handleNameChange}
                rules={rules} handleRulesChange={handleRulesChange}
                handleDescriptionChange={handleDescriptionChange} handleGameStateChange={handleGameStateChange}
                onSubmit={updateGame} buttonText="Update game"/>
        </div>
    )
}

export default UpdateGame;