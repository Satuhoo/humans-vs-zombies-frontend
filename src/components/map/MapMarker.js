import { Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import gs from "../../graves.svg";

//Adds the kill locations from the list to the map
function MapMarker(props) {     
    
    //Creates gravestone icon
    let newIcon = L.icon({
      iconUrl: gs,
      iconRetinaUrl: gs,        
      iconSize: [50, 50]
    });
    
    const markers = props.kills.map (kill => {
        return <div key={kill.id}>
        <Marker position = {[kill.lat, kill.lng]} icon = {newIcon}>
            <Popup>
                {kill.story}
            </Popup>
        </Marker>
        </div>        
    })
  
    return (
      <div className="mapMarker">          
         {markers}    
      </div>
    );
  };

  export default MapMarker;
