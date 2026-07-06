import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
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

const ComplaintMap = ({ markers }) => {

  const navigate = useNavigate();

  return (

    <div className="border border-[#0B3D62]/30 bg-white">

      <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3">

        <h3 className="text-sm font-bold text-[#0B3D62] uppercase tracking-wide">

          Village Demand Hotspots

        </h3>

        <p className="text-xs text-[#5A5A5A]">

          {markers.length} Villages

        </p>

      </div>

      <MapContainer
        center={[22.0574, 78.9382]}
        zoom={9}
        style={{
          height: "550px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {

          markers.map((marker) => (

            <Marker
               key={marker._id}
              position={[
                marker.latitude,
                marker.longitude,
              ]}
            >

              <Popup>

                <div
                  style={{
                    minWidth: "200px",
                    fontFamily: "Georgia",
                  }}
                >

                  <h3
                    style={{
                      color: "#0B3D62",
                      marginBottom: "8px",
                    }}
                  >
                    📍 {marker.village}
                  </h3>

                  <p>

                    <b>Total Complaints :</b>

                    {" "}

                    {marker.totalComplaints}

                  </p>

                  <p>

                    <b>Top Issue :</b>

                    {" "}

                    {marker.topIssue}

                  </p>

                  <p>

                    <b>High Priority :</b>

                    {" "}

                    {marker.highUrgency}

                  </p>

                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: "10px",
                    }}
                    onClick={() =>
                      navigate(`/mp/village/${marker.village}`)
                    }
                  >

                    View Profile

                  </button>

                </div>

              </Popup>

            </Marker>

          ))

        }

      </MapContainer>

    </div>

  );

};

export default ComplaintMap;