import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map(props) {
  const mapRef = useRef(null);
  const [position, setPosition] = useState(null);
  const latitude = props?.data.lat;
  const longitude = props?.data.lng;

  return <></>;
}

export default Map;
