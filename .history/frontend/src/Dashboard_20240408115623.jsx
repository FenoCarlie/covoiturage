import { useState } from "react";
import SearchBar from "./content/SearchBar";
import Itinerary from "./content/Itinerary";

function Dashboard() {
  const [searchData, setSearchData] = useState({});

  const handleSearch = (data) => {
    setSearchData(data);
  };
  return (
    <div className="flex h-full justify-center mt-[100px] items-center flex-col">
      <SearchBar onSearch={handleSearch} />
      <Itinerary searchData={searchData} />
    </div>
  );
}

export default Dashboard;
