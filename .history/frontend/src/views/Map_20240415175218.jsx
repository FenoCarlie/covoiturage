import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ coordonate }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <>
      {/*<MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>*/}
    </>
  );
}

export default Map;
