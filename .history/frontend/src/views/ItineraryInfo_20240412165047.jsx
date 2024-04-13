import { useStateContext } from "../context/ContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState({});

  const getItinerary = (id) => {
    setLoading(true);
    axiosClient
      .get("/search/itinerary", { params: { _id: itineraryId } })
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
      getItinerary(itineraryId);
    }
  }, [itineraryId]); // Added itineraryId as a dependency

  console.log(itinerary);

  return <>{itineraryId}</>;
}

export default ItineraryInfo;
