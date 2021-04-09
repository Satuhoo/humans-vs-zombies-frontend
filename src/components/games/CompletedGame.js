import Map from '../map/Map';
import GameState from './GameState';
import DeleteGame from '../admin/DeleteGame';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/GameDetails.css';
import { useEffect, useState } from 'react';
import { getStatistics } from '../../store/actions/gameActions';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from "react";

//Shown when game state is complete
//Returns the statistics of the completed game
function CompletedGame({game, user}) {
    const statistics = useSelector(state => state.gameReducer.statistics);
    const players = useSelector(state => state.playerReducer.players);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatistics(game.id));
    }, [dispatch, game.id])

    useEffect(() => {
        if (statistics !== undefined) {
            setLoading(false);
        }
    }, [statistics])

    //Changes the time stamp for more readable form
    const formatTimeStamp = (timeStamp) =>{        
        const options = { hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric'};
        return new Date(timeStamp).toLocaleTimeString('en-GB', options);
    }

    if (loading) return (
        <div className="spinner">
            <p>Loading the data</p>
            <Spinner  animation="border" variant="warning" />
        </div>
    ) 

    return (
        <div>
            {user.isAdmin && <div className="admin-container">
                <DeleteGame game={game}/>
            </div>}
            <div className="grid-container">
                <div>
                    <h2>{game.name}</h2>
                    <br/>
                    <p className="statistics-title">Most kills:</p>
                    <p><b>{statistics.topPlayer.playername}</b> with {statistics.topPlayer.kills} kill</p>
                    <p className="statistics-title">Original Zombi:</p>
                    <p>{statistics.patientZero}</p>
                    <p className="statistics-title">Game in numbers:</p>
                    <p>Players in the game: {players.length}</p>
                    <p>Kills in the game: {statistics.numKills}</p>
                    <p>Amount of humans: {statistics.numHumans}</p>
                    <p>Amount of zombies: {statistics.numZombies}</p>
                </div>
                <div>
                    <br/>
                    <p className="statistics-title">Kills in the map:</p>
                    <Map game={game}/>
                </div>
                <div>
                    <h3>Game state</h3>
                    <GameState game={game}/>
                    <br/>
                    <p className="statistics-title">Kills:</p>
                    <ListGroup className="kill-list" variant="flush">
                        {statistics.killList.map((kill, index) => 
                            <ListGroup.Item key={index}>{kill.killerName} killed {kill.victimName} at {formatTimeStamp(kill.timeStamp)}</ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default CompletedGame;