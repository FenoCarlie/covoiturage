import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import { Style, Stroke } from "ol/style";
import { transformExtent } from "ol/proj";
import { applyTransform } from "ol/extent";
import { get as getProjection } from "ol/proj";
import { transform } from "ol/proj";

const OpenLayersMap = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    const point1 = new Feature({
      geometry: new Point(fromLonLat([-111.04, 45.68])),
    });
    const point2 = new Feature({
      geometry: new Point(fromLonLat([120.04, -30.98])),
    });

    vectorSource.addFeatures([point1, point2]);

    // Example of transforming coordinates for drawing a route
    const start = transform([-111.04, 45.68], "EPSG:4326", "EPSG:3857");
    const end = transform([120.04, -30.98], "EPSG:4326", "EPSG:3857");

    // Example of fetching route data from an external service (e.g., OSRM)
    // This part requires an actual API call to a routing service
    // For demonstration, we'll simulate fetching route data
    const routeData = [
      [start[0], start[1]],
      [end[0], end[1]],
    ];

    const routeFeature = new Feature({
      geometry: new LineString(routeData).transform("EPSG:4326", "EPSG:3857"),
    });

    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "blue",
          width: 2,
        }),
      })
    );

    vectorSource.addFeature(routeFeature);

    // Optional: Center map on points
    map.getView().fit(vectorSource.getExtent(), { size: map.getSize() });
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default OpenLayersMap;
