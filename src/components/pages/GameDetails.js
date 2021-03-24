import { useEffect } from "react";
import { getGame } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';

function GameDetails(props) {
    const id = props.match.params.id;
    const game = useSelector(state => state.gameReducer.game);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getGame(id));
    }, [id, dispatch])

    return (
        <div>
            <h1>{game.name}</h1>
        </div>
    )
}

export default GameDetails;