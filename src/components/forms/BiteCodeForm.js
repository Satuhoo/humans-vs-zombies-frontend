import Button from 'react-bootstrap/Button';

function BiteCodeForm(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    Bite Code: <input value={props.biteCode} onChange={props.handleBiteCodeChange} />
                </div>
                <Button variant="info" type="submit">Bite</Button>
            </form>
        </div>
    )
}

export default BiteCodeForm;