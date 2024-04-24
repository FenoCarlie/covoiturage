import React from "react";

function LoadItineraryInfo() {
  return (
    <>
      <section className="w-[30%] h-full p-4">
        <div className="p-3 flex w-full border rounded-lg shadow-2xl">
          <div className="flex w-full animate-pulse">
            <div
              className={`mr-6 relative w-[45%] h-60 overflow-hidden bg-cover rounded-lg bg-center bg-no-repeat bg-slate-400`}
            ></div>
            <div className="flex flex-col w-[55%]">
              <div className="mt-1 h-8 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              <div className="mt-4 h-6 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
              <div className="mt-4 h-6 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
              <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <span className="pl-4 text-gray-600"></span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[70%] flex flex-col items-center h-full p-4 animate-pulse">
        <div className="mt-4 h-8 w-[15%] rounded-lg bg-slate-400 text-sm mb-[60px]"></div>
        <div className="w-[45%]">
          <div className="flex w-full justify-between">
            <ol className="relative w-full border-s-4 h-[90px] border-teal-400">
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                <span className="flex w-full justify-between">
                  <div className="h-6 w-[75%] rounded-lg bg-slate-400 text-sm"></div>
                </span>
                <div className="ml-4 mt-2 h-4 w-[40%] rounded-lg bg-slate-400 text-sm"></div>
              </li>
              <li className="ms-6 justify-between">
                <span className="absolute flex items-center justify-center w-3 h-3 bg-[#255aaa] rounded-full -start-2 ring-2 ring-white"></span>
                <div className="mt-4 h-6 w-[75%] rounded-lg bg-slate-400 text-sm"></div>
              </li>
            </ol>
          </div>
        </div>
        <p className="h-1 mt-16 mb-8 w-[50%] rounded-lg bg-[#c9c9c96e] text-sm"></p>
      </section>
    </>
  );
}

export default LoadItineraryInfo;
