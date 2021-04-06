import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setGameCoordinates } from '../../store/actions/gameActions';

function GameLocationMarker() {
    const [position, setPosition] = useState(null);
    const dispatch = useDispatch();

    //When clicking the map, sets clicked position coordinates to the redux and 
    //shows the marker in the map
    const map = useMapEvents({
      click(e) {
        map.locate()
        setPosition(e.latlng)
        dispatch(setGameCoordinates(e.latlng))
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Game location</Popup>
      </Marker>
    )
  }

  export default GameLocationMarker;