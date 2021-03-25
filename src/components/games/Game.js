function Game({game, gameClicked}) {
    const handleClickGame = () => {
        gameClicked(game)
    }

    return (
        <div onClick={handleClickGame}>
            <h2>{game.name}</h2>
            <p>{game.gameState} Players: {game.players.length}</p>
        </div>
    )
}

export default Game;