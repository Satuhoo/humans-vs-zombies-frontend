function GameForm(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Name: <input value={props.name} onChange={props.handleNameChange} />
                </div>
                <div>
                    Description: <input value={props.description} onChange={props.handleDescriptionChange} />
                </div>
                <button type="submit">{props.buttonText}</button>
            </form>
        </div>
    )
}

export default GameForm;