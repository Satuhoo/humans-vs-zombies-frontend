import '../styles/GameDetails.css';

function UpdateGameForm(props) {
    return (
        <form className="update-form" onSubmit={props.onSubmit}>
            <input className="title-input" value={props.name} onChange={props.handleNameChange}/>
            <h3>Description</h3>
            <input className="description-input" value={props.description} onChange={props.handleDescriptionChange}/>
            <br/>
            <button className="update-btn" type="submit">Update</button>
        </form>
    )
}

export default UpdateGameForm;