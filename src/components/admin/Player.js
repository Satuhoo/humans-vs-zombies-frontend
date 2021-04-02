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
      {playerItem && <p>
        player id: {playerItem.id} {playerItem.human ? 'Human' : 'Zombie'}
        <Button onClick={onChangePlayerState}>
            {playerItem.human ? 'Turn into a zombie' : 'Turn into a human'}
        </Button>
      </p>}
    </div>
  )
}

export default Player