import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Itinerary({ searchData }) {
  const [ loading, setLoading] = useState(false)
  const [search, setSearch] = useState(null);
  const [tinerary, setItinerary] = useState({""});


  const getItinerary = () => {
    setLoading(true);
    axiosClient.get("/itinerary")
    .then(({ data }) => {
      setLoading(false);
      const itinerary = (data);
      setFilteredClient(data);
    })
    .catch(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if (searchData) {
      setSearch(searchData);
    }
  }, [searchData]);

  return (
    <>
      <div className="flex h-full">
        <span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span>
      </div>
    </>
  );
}

export default Itinerary;
