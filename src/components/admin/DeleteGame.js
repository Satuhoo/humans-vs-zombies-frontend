import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteGameById } from '../../store/actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import '../styles/GameDetails.css';

function DeleteGame({game}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const deleteGame = (event) => {
        event.preventDefault();
        dispatch(deleteGameById(game.id))
        history.push('/')
    }

    return (
        <div>
            <Button className="admin-btn" variant="info" size="sm" onClick={deleteGame}>
                <FontAwesomeIcon  className="icon" icon={faTrashAlt}/>
            </Button>
        </div>
    )
}

export default DeleteGame;