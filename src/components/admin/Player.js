import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Player = ({ player, handlePlayerStateChange }) => {
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
          <div>
            <Button variant="info" size="sm" onClick={onChangePlayerState}>
                {playerItem.human ? 'Turn into a zombie' : 'Turn into a human'}
            </Button>
          </div>
        </div>}
    </div>
  )
}

export default Player