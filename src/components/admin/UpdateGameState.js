import { useDispatch } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';

function UpdateGameState({game}) {
    const dispatch = useDispatch();

    const startGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            ...game,
            gameState: 'IN_PROGRESS',
            players: []
        }
        dispatch(updateGameById(updatedGame));
    }

    const endGame = (event) => {
        event.preventDefault();
        const updatedGame = {
            ...game,
            gameState: 'COMPLETE',
            players: []
        }
        dispatch(updateGameById(updatedGame));
    }

    return (
        <div>
           {(() => {
                switch (game.gameState) {
                case "REGISTRATION": return <button onClick={startGame}>Start game</button>;
                case "IN_PROGRESS": return <button onClick={endGame}>End game</button>;
                default: return null;
                }
            })()}
        </div>
    )
}

export default UpdateGameState;