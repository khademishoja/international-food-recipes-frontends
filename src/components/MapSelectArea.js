import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleProvider, GeoSearchControl } from "leaflet-geosearch";
import { setLocation } from "../store/restaurant/slice";
const SearchField = (props) => {
  const dispatch = useDispatch();

  const params = {
    apiKey: "AIzaSyAWkGffEmPaZolfx90TBkuWQD8WwrpNO5M",
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
    debugger;
    dispatch(
      setLocation({ latitude: args.location.x, longitude: args.location.y })
    );
    console.log(args.location);
  });
  map.on("geosearch/marker/dragend", (args) => {
    debugger;
    dispatch(
      setLocation({ latitude: args.location.x, longitude: args.location.y })
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
        display: "flex",
        justifyContent: "center",
        margin: "50px",
        color: "black",
      }}
    >
      <MapContainer
        style={{
          border: "2px solid",
          borderRadius: "10px",
          height: "50vw",
          width: "60vw",
          maxWidth: "1000px",
          maxHeight: "800px",
          margin: "0px 19.5%",
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
