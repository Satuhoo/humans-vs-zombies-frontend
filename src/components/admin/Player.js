import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";

const Player = ({ player, handlePlayerStateChange }) => {
  const game = useSelector(state => state.gameReducer.game);
  
  const onChangePlayerState = () => {
    handlePlayerStateChange(player)
  }

  return (
    <div>
      {player && 
        <div className="player-item">
          <div>
            <p>Player <strong>{player.playerName}</strong>:  {player.human ? 'human' : 'zombie'}</p>
          </div>
          {game.gameState === 'IN_PROGRESS' && <div>
            <Button variant="info" size="sm" onClick={onChangePlayerState}>
                {player.human ? 'Turn into a zombie' : 'Turn into a human'}
            </Button>
          </div>}
        </div>}
    </div>
  )
}

export default Player