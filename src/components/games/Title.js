function Title({game}) {
    return (
        <div className="game-details-container">
            <div>
                <h2>{game.name}</h2>
                <br/>
                <h3>Description</h3>
                <p>{game.description}</p>
            </div>
            <div>
                <h3>Rules</h3>
                <p>{game.rules}</p>
            </div>
        </div>
    )
}

export default Title;