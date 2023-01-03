import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//,

export default function Map(props) {
  return (
    <div
      id="map"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <MapContainer
        style={{
          border: "2px solid",
          borderRadius: "10px",
          height: "30vw",
          width: "40vw",
          maxWidth: "500px",
          maxHeight: "300px",
          margin: "0px 19.5%",
        }}
        center={[props.latitude, props.longitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=v4T1pdLNYtqXIQR4IOYC"
        />
        <Marker key={props.index} position={[props.latitude, props.longitude]}>
          {/* when we click on the marker, we see the popup */}
          <Popup>
            <img
              alt={props.name}
              style={{ width: "100px", borderRadius: "0.5em" }}
              src={props.imageUrl}
            />
            <p>{props.name}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
