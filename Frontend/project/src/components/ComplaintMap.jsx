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
    <div className="border border-[#0B3D62]/30 bg-white">
      <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3">
        <h3 className="text-sm font-bold text-[#0B3D62] uppercase tracking-wide">
          Grievance Location Map
        </h3>
        <p className="text-xs text-[#5A5A5A]">
          {locations.length} complaint{locations.length !== 1 ? "s" : ""} plotted
        </p>
      </div>

      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={7}
        style={{
          height: "500px",
          width: "100%",
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
              <div style={{ fontFamily: "Georgia, serif", minWidth: "150px" }}>
                <p style={{ fontWeight: 700, color: "#0B3D62", margin: "0 0 4px 0", fontSize: "13px" }}>
                  {item.village}
                </p>
                <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#3A3A3A" }}>
                  {item.aiResponse?.category}
                </p>
                <p
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#8B1E23",
                    border: "1px solid #8B1E23",
                    padding: "2px 6px",
                    margin: 0,
                  }}
                >
                  {item.complaintStatus}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ComplaintMap;