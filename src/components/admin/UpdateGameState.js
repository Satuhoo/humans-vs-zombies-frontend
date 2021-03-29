import { useDispatch } from "react-redux";
import { updateGameById } from '../../store/actions/gameActions';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../styles/Alert.css';

function UpdateGameState({game}) {
    const dispatch = useDispatch();

    const startGame = (event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Start game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const updatedGame = {
                        ...game,
                        gameState: 'IN_PROGRESS',
                        players: []
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
        confirmAlert({
            title: 'Finish game',
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const updatedGame = {
                        ...game,
                        gameState: 'COMPLETE',
                        players: []
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

    return (
        <div>
           {(() => {
                switch (game.gameState) {
                case "REGISTRATION": 
                    return <Button variant="info" size="sm" onClick={startGame}>Start game</Button>;
                case "IN_PROGRESS": 
                    return <Button variant="info" size="sm" onClick={endGame}>End game</Button>;
                case "COMPLETE":
                        return <span className="complete-text">Completed</span>
                default: return null;
                }
            })()}
        </div>
    )
}

export default UpdateGameState;