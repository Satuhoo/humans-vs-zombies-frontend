import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";

const Player = ({ player, handlePlayerStateChange }) => {
  const game = useSelector(state => state.gameReducer.game);
  const [playerItem, setPlayerItem] = useState(null)

  useEffect(() => {
    setPlayerItem(player)
  }, [player])
  
  const onChangePlayerState = () => {
    handlePlayerStateChange(playerItem)
  }

  return (
    <div>
      {playerItem && 
        <div className="player-item">
          <div>
            <p>Player <strong>{playerItem.playerName}</strong>:  {playerItem.human ? 'human' : 'zombie'}</p>
          </div>
          {game.gameState === 'IN_PROGRESS' && <div>
            <Button variant="info" size="sm" onClick={onChangePlayerState}>
                {playerItem.human ? 'Turn into a zombie' : 'Turn into a human'}
            </Button>
          </div>}
        </div>}
    </div>
  )
}

export default Player