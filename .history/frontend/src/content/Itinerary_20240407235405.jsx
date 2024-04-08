import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Itinerary({ searchData }) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [itinerary, setItinerary] = useState({});

  const getItinerary = () => {
    setLoading(true);
    axiosClient
      .get("/itinerary")
      .then(({ data }) => {
        setLoading(false);
        setItinerary(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchData) {
      setSearch(searchData);
    } else {
      console.log("no search");
    }
    getItinerary();
  }, [searchData]);

  return (
    <>
      <div className="flex h-full w-full">
        {/*<span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span>*/}
        {loading && <div>Loading...</div>}
        {search && <div>Search: {search.destination}</div>}
        {itinerary && <div>Itinerary: {itinerary.title}</div>}
      </div>
    </>
  );
}

export default Itinerary;
