import { useEffect, useState } from "react";
import GameService from '../../services/game.service';

function GameDetails(props) {
    const id = props.match.params.id;
    const [game, setGame] = useState({});
    
    useEffect(() => {
        GameService.getGameByID(id)
        .then(response => setGame(response.data))
    }, [id])

    return (
        <div>
            <h1>{game.name}</h1>
        </div>
    )
}

export default GameDetails;