import { useEffect } from "react";
import { getGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web'

function GameDetails(props) {
    const { keycloak } = useKeycloak();
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getGame(id));
    }, [id, dispatch])

    return (
        <div>
            {keycloak.authenticated &&
                <div>
                <h1>{game.name}</h1>
            </div>            
            }
        {!keycloak.authenticated &&
                <div>
                <h1>You have to be logged in to see this page.</h1>
                <Link to="/login">Click here to login</Link>
            </div>            
            }        
        </div>
    
    )
}

export default GameDetails;