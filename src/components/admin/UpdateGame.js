import { useState } from 'react';
import GameService from '../../services/game.service';
import GameForm from '../forms/GameForm';

function UpdateGame({game, games, handleGamesChange}) {
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description);
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const updateGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            id: game.id,
            name,
            gameState: 'IN_PROGRESS',
            chat_id: null
        }
        GameService.updateGame(game.id, updatedGame)
        .then(returnedGame => {
            let removeIndex = games.map(function(item) { return item.id; }).indexOf(game.id);
            games.splice(removeIndex, 1);
            handleGamesChange(games.concat(returnedGame.data));
        })
    }

    const deleteGame = () => {
        GameService.deleteGame(game.id);
        let removeIndex = games.map(function(item) { return item.id; }).indexOf(game.id);
        games.splice(removeIndex, 1);
        handleGamesChange(games);
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