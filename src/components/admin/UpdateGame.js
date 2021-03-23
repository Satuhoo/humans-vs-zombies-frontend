import { useState } from 'react';
import GameForm from '../forms/GameForm';
import { useDispatch } from "react-redux";
import { updateGameById, deleteGameById } from '../../store/actions/gameActions';

function UpdateGame({game, hideForm}) {
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description);
    const dispatch = useDispatch();
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const updateGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            ...game,
            name,
            gameState: 'IN_PROGRESS',
        }
        dispatch(updateGameById(updatedGame));
        hideForm();
    }

    const deleteGame = (event) => {
        event.preventDefault();
        dispatch(deleteGameById(game.id))
        hideForm();
    }

    return (
        <div>
            <GameForm name={name} description={description} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} onSubmit={updateGame} buttonText="Update game"/>
            <button onClick={deleteGame}>Delete game</button>
        </div>
    )
}

export default UpdateGame;