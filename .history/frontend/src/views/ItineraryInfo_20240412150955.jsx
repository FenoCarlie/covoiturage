import DatePicker from "react-datepicker";
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
      .get("/show/itinerary", id)
      .then(({ data }) => {
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getItinerary(itineraryId);
  });

  console.log(itinerary);

  return <>{itinerary}</>;
}

export default ItineraryInfo;
