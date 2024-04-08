import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";

function SearchBar({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && passengers) {
      onSearch({ from, to, passengers });
    }
  };

  return (
    <div className="w-full fixed bg-white p-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center shadow-l rounded-[15px]"
      >
        {/* From input */}
        <div className="flex items-stretch justify-stretch p-1">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiLocationOn />
            </div>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-gray-50 hover:bg-[#eeeeee94] text-gray-900 text-lg rounded-lg focus:outline-none focus:bg-[#eeeeee] block w-full ps-10 p-2.5"
              placeholder="From..."
              required
            />
          </div>
          <hr className="my_hr"></hr>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiLocationOn />
            </div>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-gray-50 hover:bg-[#eeeeee94] text-gray-900 text-lg rounded-lg focus:outline-none focus:bg-[#eeeeee] block w-full ps-10 p-2.5"
              placeholder="To..."
              required
            />
          </div>
          <hr className="my_hr"></hr>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiLocationOn />
            </div>
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="bg-gray-50 hover:bg-[#eeeeee94] text-gray-900 text-lg rounded-lg focus:outline-none focus:bg-[#eeeeee] block ps-10 p-2.5"
              placeholder="Passengers"
            />
          </div>
          <div className="flex items-stretch justify-stretch">
            <button
              type="submit"
              className="bg-[#00aff5] w-[100%] p-4 rounded-r-[15px]"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
