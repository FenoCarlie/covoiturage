import { useState } from "react";
import SearchBar from "./content/SearchBar";
import Itinerary from "./content/Itinerary";

function Dashboard() {
  const [searchData, setSearchData] = useState({});

  const handleSearch = (data) => {
    setSearchData(data);
  };
  return (
    <div className="flex h-full justify-center items-center flex-col">
      <SearchBar onSearch={handleSearch} />
      <Itinerary searchData={searchData} />
      <h1>dashboard</h1>
      <div class="relative" data-twe-dropdown-position="dropend">
        <button
          class="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="button"
          id="dropdownMenuButton1e"
          data-twe-dropdown-toggle-ref
          aria-expanded="false"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          Dropright
          <span class="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        <ul
          class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
          aria-labelledby="dropdownMenuButton1e"
          data-twe-dropdown-menu-ref
        >
          <li>
            <a
              class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
              href="#"
              data-twe-dropdown-item-ref
            >
              Action
            </a>
          </li>
          <li>
            <a
              class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
              href="#"
              data-twe-dropdown-item-ref
            >
              Another action
            </a>
          </li>
          <li>
            <a
              class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
              href="#"
              data-twe-dropdown-item-ref
            >
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
