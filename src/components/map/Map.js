import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
    const defaultPosition = [60.454510, 22.264824];
  
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
        </MapContainer>
      </div>
    );
  };

  export default Map;