import Itinerary from "@/components/Itinerary";
import SearchBar from "@/components/SearchBar";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center flex-col">
      <SearchBar />
      <Itinerary />
    </div>
  );
}
