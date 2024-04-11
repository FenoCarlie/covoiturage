import { useStateContext } from "../context/ContextProvider";

function ItineraryInfo() {
  const { itineraryId } = useStateContext();

  return (
    <>
      <h2 className="text-xl text-gray-900 dark:text-white font-bold mb-2">
        Digital Transformation
      </h2>
      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-gray-400 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-900 dark:text-white text-base font-medium">
            30.06.2024
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-gray-400 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-900 dark:text-white text-base font-medium">
            California, USA
          </span>
        </div>
      </div>
      <div className="flex items-start space-x-4 rtl:space-x-reverse mb-5">
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-2">
            Participants
          </div>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <img
              className="w-8 h-8 border border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-2.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 border border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-3.jpg"
              alt=""
            />
            <a
              className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#"
            >
              +99
            </a>
          </div>
        </div>
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
            Duration
          </div>
          <span className="text-gray-900 dark:text-white text-base font-medium block">
            30 min
          </span>
        </div>
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">
            Meeting Type
          </div>
          <span className="text-gray-900 dark:text-white text-base font-medium block">
            Web conference
          </span>
        </div>
      </div>
      <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
        <div
          inline-datepicker
          datepicker-buttons
          datepicker-autoselect-today
          className="mx-auto sm:mx-0"
        ></div>
        <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
          <h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
            Wednesday 30 June 2024
          </h3>
          <button
            type="button"
            data-collapse-toggle="timetable"
            className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd"
              />
            </svg>
            Pick a time
          </button>
          <label className="sr-only">Pick a time</label>
          <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
            <li>
              <input
                type="radio"
                id="10-am"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="10-am"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                10:00 AM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="10-30-am"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="10-30-am"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                10:30 AM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="11-am"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="11-am"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                11:00 AM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="11-30-am"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="11-30-am"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                11:30 AM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="12-am"
                value=""
                className="hidden peer"
                name="timetable"
                checked
              />
              <label
                for="12-am"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                12:00 AM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="12-30-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="12-30-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                12:30 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="1-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="1-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                01:00 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="1-30-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="1-30-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                01:30 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="2-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="2-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                02:00 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="2-30-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="2-30-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                02:30 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="3-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="3-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                03:00 PM
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="3-30-pm"
                value=""
                className="hidden peer"
                name="timetable"
              />
              <label
                for="3-30-pm"
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                03:30 PM
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ItineraryInfo;
