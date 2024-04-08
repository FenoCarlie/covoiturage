import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Itinerary({ searchData }) {
  const [loading, setLoading] = useState();
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
      console.log("search data loaded");
    } else {
      console.log("no search data");
    }
    //getItinerary();
  }, [searchData]);

  return (
    <>
      <div className="flex h-full w-full">
        {/*  <span>{search?.from}</span>
        <span>{search?.passengers}</span>
        <span>{search?.to}</span> */}
        {/* search && <div>Search: {search.destination}</div> */}
        {/* itinerary && <div>Itinerary: {itinerary.title}</div> */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="p-3 w-[40%] flex justify-center">filter side</div>
            <div className="p-3 w-[60%] flex justify-center items-center bg-blue-gray-100  flex-col">
              itinerary side
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Itinerary;
