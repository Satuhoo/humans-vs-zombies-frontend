

function Title({game, registered, handleClickEdit}) {
    return (
        <div>
            <div className="title-container">
                <h2>{game.name}</h2>
                
            </div>
            <h3>Description</h3>
            <p>{game.description}</p>
            <h3>Game state</h3>
            <p>{game.gameState}</p>
        </div>
    )
}

export default Title;