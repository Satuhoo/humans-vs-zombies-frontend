import { MapContainer, TileLayer } from "react-leaflet";
import { getKills } from '../../store/actions/gameActions';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';
import MapMarker from "./MapMarker";

function Map(props) {
         
    const dispatch = useDispatch();
    const kills = useSelector(state => state.gameReducer.kills);

    useEffect(() => {
      dispatch(getKills(props.game.id));      
    }, [props.game.id, dispatch])

    // fetch updated data when receiving a relevant websocket message
    const onReceiveMessage = msg => {
      if (msg.gameId === props.game.id) {
        dispatch(getKills(props.game.id)); 
      }
    }

    return (
      <div>
        <SockJsClient url={process.env.REACT_APP_SOCK_JS_URL} 
          topics={[
              "/topic/addKill",
              "/topic/updatePlayer"
          ]}
          onMessage={ msg => onReceiveMessage(msg) }
        />
        <div className="leaflet-container">
          <MapContainer
            center={[props.game.latitude, props.game.longitude]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker kills = {kills}></MapMarker>
          </MapContainer>
        </div>
      </div>
    );
  };

  export default Map;