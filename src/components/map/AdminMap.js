import { MapContainer, TileLayer } from "react-leaflet";
import GameLocationMarker from './GameLocationMarker';

//Shown when adding the new game, helps to set game coordinates using the map
function AdminMap({latitude, longitude}) {
    return (
      <div className="leaflet-container">
        <MapContainer center={{ lat: latitude, lng: longitude }} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <GameLocationMarker />
        </MapContainer>
      </div>
    );
  };

  export default AdminMap;
