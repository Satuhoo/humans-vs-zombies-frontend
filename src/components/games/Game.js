function Game({game, gameClicked}) {
    const handleClickGame = () => {
        gameClicked(game)
    }

    return (
        <div onClick={handleClickGame}>
            <h2>{game.name}</h2>
        </div>
    )
}

export default Game;