import { useDispatch } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../styles/Alert.css';

function UpdateGameState({game}) {
    const dispatch = useDispatch();

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
                    dispatch(updateGameById(updatedGame)); 
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
                    dispatch(updateGameById(updatedGame));
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