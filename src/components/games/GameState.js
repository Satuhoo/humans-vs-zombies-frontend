import '../styles/GameState.css';

function GameState({game}){
    if (game.gameState === 'REGISTRATION') {
        return (
            <div>
                <p className="game-state-registration">Registration</p>
            </div>
        )
    } else if (game.gameState === 'IN_PROGRESS') {
        return (
            <div>
                <p className="game-state-in-progress">In progress</p>
            </div>
        )
    } else {
        return (
            <div>
                <p className="game-state-complete">Completed</p>
            </div>
        )
    }
}

export default GameState;