import "@tomtom-international/web-sdk-maps/dist/maps.css";
import mapSDK from "@tomtom-international/web-sdk-maps";
import mapServices from "@tomtom-international/web-sdk-services";
import { React, useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function Map(props) {
  const latitude = props?.data.lat;
  const longitude = props?.data.lng;

  return <></>;
}

export default Map;
