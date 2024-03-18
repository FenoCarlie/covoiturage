import React from "react";
import { CiLocationOn } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="w-full bg-white p-20 flex items-center justify-center">
      <form className="flex items-center justify-center shadow-l rounded-[15px]">
        <div className="flex p-1">
          <label for="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <CiLocationOn />
            </div>
            <input
              type="text"
              id="simple-search"
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
              id="simple-search"
              className="bg-gray-50 hover:bg-[#eeeeee94] text-gray-900 text-lg rounded-lg focus:outline-none focus:bg-[#eeeeee] block w-full ps-10 p-2.5"
              placeholder="To..."
              required
            />
          </div>
          <hr className="my_hr"></hr>
        </div>
        <input type="date" placeholder="Departure" className="mr-4" />
        <hr className="my_hr"></hr>
        <input type="number" placeholder="Passengers" />
        <div className="flex items-stretch justify-stretch">
          <button className="bg-[#00aff5] w-[100%] p-4 rounded-r-[15px]">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
