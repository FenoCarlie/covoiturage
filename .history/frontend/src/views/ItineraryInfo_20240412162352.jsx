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
      .get("/search/itinerary", id)
      .then(({ data }) => {
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getItinerary(idData);
  });

  console.log(itinerary);

  return <>{itineraryId}</>;
}

export default ItineraryInfo;
