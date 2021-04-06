import { MapContainer, TileLayer } from "react-leaflet";
import { getKills } from '../../store/actions/gameActions';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MapMarker from "./MapMarker";

function Map(props) {
         
    const dispatch = useDispatch();
    const kills = useSelector(state => state.gameReducer.kills);

    useEffect(() => {
      dispatch(getKills(props.game.id));      
  }, [props.game.id, dispatch])

    return (
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
    );
  };

  export default Map;