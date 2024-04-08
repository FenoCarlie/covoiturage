import React from "react";
import { useParams } from "react-router-domr";

function ItineraryInfo() {
  const itineraryId = useParams;
  return <div>ItineraryInfo ID : {itineraryId} </div>;
}

export default ItineraryInfo;
