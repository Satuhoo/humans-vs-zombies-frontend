import Button from 'react-bootstrap/Button';

const Player = ({ player, handlePlayerStateChange }) => {
  const onChangePlayerState = event => {
    handlePlayerStateChange(player)
  }

  return (
    <p key={player.id}>
    player id: {player.id} {player.human ? 'Human' : 'Zombie'}
    <Button onClick={onChangePlayerState}>
        {player.human ? 'Turn to zombie' : 'Turn to human'}
    </Button>
</p>
  )
}

export default Player