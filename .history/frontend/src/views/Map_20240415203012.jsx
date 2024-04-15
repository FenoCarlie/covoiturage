import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";

function Map() {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const latitude = -18.1425919;
  const longitude = 49.3927745;
  const apiKey = import.meta.env.VITE_APP_TOMTOM_API_KEY;

  useEffect(() => {
    const map = tt.map({
      key: apiKey,
      container: mapElement.current,
      style: "tomtom://vector/1/basic-main",
      center: [longitude, latitude],
      zoom: 10,
    });
    return () => map.remove();
  }, [apiKey]);

  return (
    <>
      <div ref={mapElement} style={{ width: "100%", height: "100%" }}></div>
    </>
  );
}

export default Map;
