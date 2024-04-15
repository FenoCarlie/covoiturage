import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map(props) {
  const mapRef = useRef(null);
  const [position, setPosition] = useState(null);
  const latitude = props?.data.lat;
  const longitude = props?.data.lng;

  const showPosition = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventsHandler showPosition={showPosition} />
      </MapContainer>
    </>
  );
}

const MapEventsHandler = ({ showPosition }) => {
  useMapEvents({
    click: showPosition,
  });
  return null;
};

export default Map;
