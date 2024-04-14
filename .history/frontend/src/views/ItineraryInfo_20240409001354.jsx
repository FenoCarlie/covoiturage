import React from "react";
import { useStateContext } from "../context/ContextProvider";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  return (
    <>
      <div>ItineraryInfo</div>
      <span>{itineraryId}</span>
    </>
  );
}

export default ItineraryInfo;
