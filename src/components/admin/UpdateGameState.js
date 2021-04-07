import { useDispatch, useSelector } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../styles/Alert.css';
import { updatePlayer } from '../../store/actions/playerActions';
import { useKeycloak } from '@react-keycloak/web';

function UpdateGameState({game}) {
    const dispatch = useDispatch();
    const players = useSelector(state => state.playerReducer.players);
    const { keycloak } = useKeycloak(); 

    const patientZero = players[Math.floor(Math.random() * players.length)];

    const startGame = (event) => {
        event.preventDefault();
        //Shows the alert and update the game state for 'in progress' if clicking yes
        confirmAlert({
            title: 'Start game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const updatedGame = {
                      'id' : game.id,
                      'name' : game.name,
                      'description' : game.description,
                      'rules' : game.rules,
                      'gameState' : 'IN_PROGRESS' 
                    }
                    dispatch(updateGameById(updatedGame, keycloak.token)); 
                    const updatePatientZero = {
                      ...patientZero,
                      game: {
                          ...game,
                          players: [],
                          kills: [],
                          chat: null
                      },
                      messages: [],
                      kills: [],
                      human: false,
                      patientZero: true,
                      victimOf: null
                    }
                    dispatch(updatePlayer(game.id, updatePatientZero));
                }
              },
              {
                label: 'No',
              }
            ]
          }); 
    }

    const endGame = (event) => {
        event.preventDefault();
        //Shows the alert and update the game state for 'complete' if clicking yes
        confirmAlert({
            title: 'Finish game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const updatedGame = {
                      'id' : game.id,
                      'name' : game.name,
                      'description' : game.description,
                      'rules' : game.rules,
                      'gameState': 'COMPLETE'
                    }
                    dispatch(updateGameById(updatedGame, keycloak.token));
                }
              },
              {
                label: 'No',
              }
            ]
          });
    }

    //Checks the current game state and return right button to updating it
    return (
        <div>
           {(() => {
                switch (game.gameState) {
                case "REGISTRATION": 
                    return <Button variant="info" size="sm" onClick={startGame}>Start game</Button>;
                case "IN_PROGRESS": 
                    return <Button variant="info" size="sm" onClick={endGame}>End game</Button>;
                default: return null;
                }
            })()}
        </div>
    )
}

export default UpdateGameState;