import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteGameById } from '../../store/actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../styles/GameDetails.css';
import '../styles/Alert.css';

function DeleteGame({game}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const deleteGame = (event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Delete game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    dispatch(deleteGameById(game.id))
                    history.push('/')
                }
              },
              {
                label: 'No',
              }
            ]
          });
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