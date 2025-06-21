// components/CoverageMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';


// You can customize the marker icon if you want
const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const CoverageMap = ({ serviceCenter }) => {
  const position = [23.6850, 90.3563]; 

  return (
    <div className="w-full h-[600px] mt-5 rounded-xl overflow-hidden shadow-lg border">
      <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          serviceCenter.map((service, index) => <Marker key={index} position={[service.latitude, service.longitude]} icon={markerIcon}>
          <Popup>
            {service.covered_area.join(", ")}
          </Popup>
        </Marker>)
        }
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
