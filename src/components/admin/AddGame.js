import { useState } from "react";
import { useDispatch } from "react-redux";
import GameForm from '../forms/GameForm';
import { createGame } from '../../store/actions/gameActions';
import defaultRules from '../games/defaultRules';

function AddGame({hideForm}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState(defaultRules);
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
        const newGame = {
            name,
            description,
            rules,
            players: [],
            kills: [],
            chat: null
        }
        dispatch(createGame(newGame));
        hideForm();
    }

    return (
        <div>
            <GameForm name={name} description={description} rules={rules} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} handleRulesChange={handleRulesChange}
                onSubmit={addGame} buttonText="Create game"/>
        </div>
    )
}

export default AddGame;