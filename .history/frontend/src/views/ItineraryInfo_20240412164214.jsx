import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const idData = {
    _id: itineraryId,
  };

  const getItinerary = (id) => {
    setLoading(true);
    axiosClient
      .get("/search/itinerary", { params: id }) // Corrected to pass id as params
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (itineraryId) {
      // Ensure itineraryId is available before making the request
      getItinerary(idData);
    }
  }, [itineraryId]); // Added itineraryId as a dependency

  console.log(itinerary);

  return <>{itineraryId}</>;
}

export default ItineraryInfo;
