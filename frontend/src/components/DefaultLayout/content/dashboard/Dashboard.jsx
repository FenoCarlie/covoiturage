import { useState } from "react";
import SearchBar from "./itinerary/featurs/SearchBar";
import Itinerary from "./itinerary/Itinerary";

function Dashboard() {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (data) => {
    setSearchData(data);
  };
  return (
    <div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
      <SearchBar onSearch={handleSearch} />
      <Itinerary searchData={searchData} />
    </div>
  );
}

export default Dashboard;
