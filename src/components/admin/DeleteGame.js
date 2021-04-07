import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteGameById } from '../../store/actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../styles/GameDetails.css';
import '../styles/Alert.css';
import { useKeycloak } from '@react-keycloak/web';  

function DeleteGame({game}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
     

    const deleteGame = (event) => {
        event.preventDefault();
        //Shows the alert and deletes the game if clicking yes. Navigates back to the landing page
        confirmAlert({
            title: 'Delete game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    dispatch(deleteGameById(game.id, keycloak.token))
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