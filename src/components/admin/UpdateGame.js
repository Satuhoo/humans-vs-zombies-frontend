import { useState } from 'react';
import UpdateGameForm from '../forms/UpdateGameForm';
import { useDispatch } from "react-redux";
import { updateGameById, deleteGameById } from '../../store/actions/gameActions';
import { useHistory } from 'react-router-dom';

function UpdateGame({game, hideForm}) {
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description);
    const [gameState, setGameState] = useState(game.gameState);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleGameStateChange = (event) => {
        console.log(event.target.value)
        setGameState(event.target.value)
    }

    const updateGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            ...game,
            name,
            gameState,
        }
        dispatch(updateGameById(updatedGame));
        hideForm();
    }

    const deleteGame = (event) => {
        event.preventDefault();
        dispatch(deleteGameById(game.id))
        history.push('/')
    }

    return (
        <div>
            <UpdateGameForm name={name} description={description} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} handleGameStateChange={handleGameStateChange}
                onSubmit={updateGame} buttonText="Update game"/>
            <button onClick={deleteGame}>Delete game</button>
        </div>
    )
}

export default UpdateGame;