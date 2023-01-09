import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleProvider, GeoSearchControl } from "leaflet-geosearch";
import { setLocation } from "../store/restaurant/slice";
const SearchField = (props) => {
  const dispatch = useDispatch();

  const params = {
    apiKey: process.env.REACT_APP_API_KEY,
    language: "nl", // render results in Dutch
    region: "nl", // prioritize matches within The Netherlands
  };
  const provider = new GoogleProvider({ ...params });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,
    marker: { draggable: true },
  });
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
  }, []);

  map.on("geosearch/showlocation", (args) => {
    dispatch(
      setLocation({ latitude: args.location.y, longitude: args.location.x })
    );
    console.log(args.location);
  });
  map.on("geosearch/marker/dragend", (args) => {
    dispatch(
      setLocation({ latitude: args.location.lat, longitude: args.location.lng })
    );
    console.log(args.location);
  });

  return null;
};

export default function MapSelectArea() {
  return (
    <div
      id="map"
      style={{
        marginTop: "10px",
        color: "black",
      }}
    >
      <MapContainer
        style={{
          border: "2px solid",
          borderRadius: "10px",
          height: "20vw",
          width: "35vw",
          margin: "0px",
        }}
        center={[52.36994, 4.906]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=v4T1pdLNYtqXIQR4IOYC"
        />
        <SearchField style={{ color: "red" }}></SearchField>
      </MapContainer>
    </div>
  );
}
