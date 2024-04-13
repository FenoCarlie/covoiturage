import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import opencage from "@opencage/geosearch-bundle";
import axios from "axios";

function Map() {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  const geocode = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=b44772c85f8048ccb87cc4c7805b7a16`
      );
      setLocation(response.data.results[0].geometry);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    opencage.algoliaAutocomplete({
      container: "#place",
      plugins: [
        opencage.OpenCageGeoSearchPlugin({
          key: "b44772c85f8048ccb87cc4c7805b7a16",
        }),
      ],
    });
  }, []);

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
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={geocode}>Geocode</button>
        {location && (
          <div>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}
      </div>

      <div id="place"></div>
    </>
  );
}

export default Map;
