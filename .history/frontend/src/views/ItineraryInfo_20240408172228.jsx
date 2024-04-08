import React from "react";
import { useParams } from "react-router";

const { itineraryId } = useParams();

function ItineraryInfo() {
  return <div>ItineraryInfo ID : {itineraryId} </div>;
}

export default ItineraryInfo;
