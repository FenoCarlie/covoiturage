import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map(props) {
  const mapRef = useRef(null);
  const [position, setPosition] = useState([latitude, longitude]);
  const latitude = props?.data.lat;
  const longitude = props?.data.lng;

  const showPosition = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };

  const map = useMapEvents({
    click: showPosition,
  });

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </>
  );
}

export default Map;
