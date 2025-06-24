// components/CoverageMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';


// You can customize the marker icon if you want
const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [10, 20],
  iconAnchor: [5, 15],
});

// ✅ 3. [FlyToDistrict COMPONENT] 🔖 ADDED
const FlyToDistrict = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10, {
        duration: 1.5,
      });
    }
  }, [coords, map]);

  return null;
};

const CoverageMap = ({ serviceCenter }) => {
    const [searchText, setSearchText] = useState('');
  const [foundCoords, setFoundCoords] = useState(null);

  const position = [23.6850, 90.3563]; 


   // ✅ 5. [SEARCH FUNCTION] 🔖 ADDED
  const handleSearch = () => {
    const result = serviceCenter.find(
      (item) => item.district.toLowerCase() === searchText.trim().toLowerCase()
    );

    if (result) {
      setFoundCoords([result.latitude, result.longitude]);
    } else {
      alert('District not found!');
    }
  };
  
  return (
    <div>
       <div className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Enter district name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input focus:outline-0 outline outline-primary w-full max-w-md"
        />
        <button onClick={handleSearch} className="btn btn-primary text-black">
          <FaSearch />
        </button>
      </div>


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
        <FlyToDistrict coords={foundCoords} />
      </MapContainer>
    </div>
    </div>
    
  );
};

export default CoverageMap;
