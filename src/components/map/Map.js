import { MapContainer, TileLayer } from "react-leaflet";
import { getKills } from '../../store/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import MapMarker from "./MapMarker";

function Map(props) {
    const kills = useSelector(state => state.gameReducer.kills);
    const dispatch = useDispatch();
    const defaultPosition = [60.454510, 22.264824];

    useEffect(() => {     
        dispatch(getKills(props.gameId));                        
  }, [props.gameId, dispatch])

    
    return (
      <div className="leaflet-container">
        <MapContainer
          center={defaultPosition}
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