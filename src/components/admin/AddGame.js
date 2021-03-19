import { useState } from "react";
import GameService from '../../services/game.service';
import GameForm from '../forms/GameForm';

function AddGame({games, handleGamesChange}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const addGame = (event) => {
        event.preventDefault();
        const newGame = {
            name,
            description
        }
        GameService.addGame(newGame)
        .then(returnedGame => {
            console.log(returnedGame.data);
            handleGamesChange(games.concat(returnedGame.data));
        })
    }

    return (
        <div>
            <GameForm name={name} description={description} handleNameChange={handleNameChange} 
                handleDescriptionChange={handleDescriptionChange} onSubmit={addGame} buttonText="Create game"/>
        </div>
    )
}

export default AddGame;