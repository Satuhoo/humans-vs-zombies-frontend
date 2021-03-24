function BiteCodeForm(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Bite Code: <input value={props.biteCode} onChange={props.handleBiteCodeChange} />
                </div>
                <button type="submit">Bite</button>
            </form>
        </div>
    )
}

export default BiteCodeForm;