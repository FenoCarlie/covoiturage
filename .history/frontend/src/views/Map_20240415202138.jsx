import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";

function Map(props) {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const latitude = props?.data.lat;
  const longitude = props?.data.lng;
  const apiKey = import.meta.env.VITE_APP_TOMTOM_API_KEY;

  useEffect(() => {
    const map = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [latitude, longitude],
      zoom: 2,
    });
    setMap(map);
  }, [apiKey]);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%", width: "100%" }}></div>
    </>
  );
}

export default Map;
