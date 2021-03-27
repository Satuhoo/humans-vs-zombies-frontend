import Button from 'react-bootstrap/Button';
import UpdateGameState from '../admin/UpdateGameState';
import DeleteGame from '../admin/DeleteGame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import '../styles/GameDetails.css';

function AdminBar({game, hideForm, showEditView, handleClickEdit}) {
    return (
        <div className="admin-grid-container">
            <div>
                {showEditView && <Button variant="info" size="sm" onClick={hideForm}>
                    <FontAwesomeIcon  className="icon" icon={faAngleLeft}/>
                </Button>}
            </div>
            <div className="admin-btn-flex-container">
                <UpdateGameState game={game}/>
                <Button className="admin-btn" variant="info" size="sm" onClick={handleClickEdit}>
                    <FontAwesomeIcon  className="icon" icon={faPen}/>
                </Button>
                <DeleteGame game={game}/>
            </div>
        </div>
    )
}

export default AdminBar;