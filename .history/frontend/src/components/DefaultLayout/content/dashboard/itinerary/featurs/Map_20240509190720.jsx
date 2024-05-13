import React, { useEffect, useRef, useState } from "react";
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import CircleStyle from "ol/style/Circle";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { fromLonLat } from "ol/proj";
import { unByKey } from "ol/Observable";
import { Vector as VectorSource$ } from "ol/source";
import { LineString } from "ol/geom";
import { Stroke, Fill } from "ol/style";
import axios from "axios";

function MapPage({ start, end }) {
  const mapRef = useRef(null);
  const ROUTE_COLOR = "black";
  const ROUTE_WIDTH = 5;
  const MARKER_RADIUS = 5;
  const MARKER_FILL_COLOR = "blue";
  const MARKER_STROKE_COLOR = "white";

  const routeSource = new VectorSource({ wrapX: false });
  const routeLayer = new VectorLayer({
    source: routeSource,
    style: new Style({
      stroke: new Stroke({
        color: ROUTE_COLOR,
        width: ROUTE_WIDTH,
      }),
    }),
  });

  const startMarkerSource = new VectorSource({ wrapX: false });
  const startMarkerLayer = new VectorLayer({
    source: startMarkerSource,
    style: new Style({
      image: new CircleStyle({
        radius: MARKER_RADIUS,
        fill: new Fill({ color: MARKER_FILL_COLOR }),
        stroke: new Stroke({ color: MARKER_STROKE_COLOR, width: 2 }),
      }),
    }),
  });

  const endMarkerSource = new VectorSource({ wrapX: false });
  const endMarkerLayer = new VectorLayer({
    source: endMarkerSource,
    style: new Style({
      image: new CircleStyle({
        radius: MARKER_RADIUS,
        fill: new Fill({ color: MARKER_FILL_COLOR }),
        stroke: new Stroke({ color: MARKER_STROKE_COLOR, width: 2 }),
      }),
    }),
  });

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        routeLayer,
        startMarkerLayer,
        endMarkerLayer,
      ],
      view: new View({
        center: fromLonLat([
          (start.lon + end.lon) / 2,
          (start.lat + end.lat) / 2,
        ]),
        zoom: 7,
      }),
    });

    const startMarkerFeature = new Feature(
      new Point(fromLonLat([start.lon, start.lat]))
    );
    startMarkerSource.addFeature(startMarkerFeature);

    const endMarkerFeature = new Feature(
      new Point(fromLonLat([end.lon, end.lat]))
    );
    endMarkerSource.addFeature(endMarkerFeature);

    const apiUrl = `https://api.openrouteservice.org/v2/directions/route?api_key=${
      /*import.meta.env.VITE_APP_OPENROUT_API_KEY*/
    }&coordinates=${start.lon},${start.lat};${end.lon},${end.lat}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const routeGeometry = response.data.features[0].geometry;
        setRouteCoordinates(routeGeometry.coordinates);
      })
      .catch((error) => {
        console.error("Error fetching route coordinates:", error);
      });

    return () => {
      map.dispose();
      routeSource.clear();
      startMarkerSource.clear();
      endMarkerSource.clear();
    };
  }, [start, end]);

  console.log(start, end);

  useEffect(() => {
    if (routeCoordinates.length === 0) return;

    const routeLineString = new LineString(routeCoordinates);
    routeSource.addFeature(new Feature(routeLineString));
  }, [routeCoordinates, routeSource]);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default MapPage;
