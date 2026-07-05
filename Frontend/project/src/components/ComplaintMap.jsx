import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ComplaintMap = ({ locations }) => {
  return (
    <MapContainer
      center={[23.2599, 77.4126]}
      zoom={7}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "15px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((item) => (
        <Marker
          key={item._id}
          position={[item.latitude, item.longitude]}
        >
          <Popup>
            <strong>{item.village}</strong>

            <br />

            {item.aiResponse?.category}

            <br />

            {item.complaintStatus}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ComplaintMap;