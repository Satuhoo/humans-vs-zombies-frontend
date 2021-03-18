function Game({game, gameClicked}) {
    const handleClickGame = () => {
        gameClicked(game.id)
    }

    return (
        <div onClick={handleClickGame}>
            <h2>{game.name}</h2>
        </div>
    )
}

export default Game;