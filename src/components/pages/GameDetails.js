import { useEffect, useState } from "react";
import { getGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import Keycloak from 'keycloak-js';

function GameDetails(props) {    
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {            
          setAuthenticated(authenticated);
          console.log(keycloak.token);
        })
        dispatch(getGame(id));
    }, [id, dispatch])

    return (
        <div> 
        {authenticated &&  
         <div>
           <div>{game.name}</div>               
         </div> 
        }  
  </div> 
);
}

export default GameDetails;