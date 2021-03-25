import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteGameById } from '../../store/actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
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
            <button onClick={deleteGame}>
                <FontAwesomeIcon  className="icon" icon={faTrashAlt}/>
            </button>
        </div>
    )
}

export default DeleteGame;