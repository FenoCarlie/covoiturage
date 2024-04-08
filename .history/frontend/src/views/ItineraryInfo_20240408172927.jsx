import React from "react";

import { useParams } from "react-router-dom";

function ItineraryInfo() {
  const { itineraryId } = useParams();
  return (
    <>
      <div>ItineraryInfo</div>
      <span>{itineraryId}</span>
    </>
  );
}

export default ItineraryInfo;
