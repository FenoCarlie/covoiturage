import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css";

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
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.opencage.algoliaAutocomplete({
        container: "#place",
        plugins: [
          window.opencage.OpenCageGeoSearchPlugin(
            {
              key: "b44772c85f8048ccb87cc4c7805b7a16",
            },
            {
              onSelect: function handleSelect(params) {
                console.log("Selected Item is", params.item);
                const latlng = [
                  params.item.geometry.lat,
                  params.item.geometry.lng,
                ];
                console.log("Selected result coords", latlng);
              },
              onSubmit: function handleSubmit(params) {
                console.log("Submit with", params.state.query);
              },
            }
          ),
        ],
      });
    };
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
