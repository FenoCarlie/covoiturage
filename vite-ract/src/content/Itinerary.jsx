import React, { useEffect, useState } from "react";

function Itinerary({ searchData }) {
  const [search, setSearch] = useState(null);

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
