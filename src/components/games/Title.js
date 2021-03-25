function Title({game, registered, handleClickEdit}) {
    return (
        <div>
            <div className="title-container">
                <h2>{game.name}</h2>
                {registered && <button onClick={handleClickEdit}>Edit</button>}
            </div>
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <h3>Game state</h3>
            <p>{game.gameState}</p>
        </div>
    )
}

export default Title;