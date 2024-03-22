import { svg } from "../assets/image.js";
import { FaLocationDot } from "react-icons/fa6";

const Course = () => {
  return (
    <div className="h-full flex flex-col justify-evenly w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full items-center">
        <div className="h-full w-[55%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="flex w-[45%] p-5">
          <div className="bg-[#aeb63d] p-4 rounded-lg mr-2">
            <ol className=" overflow-hidden space-y-8">
              <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-indigo-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
                <a className="flex items-start font-medium w-full  ">
                  <span className="w-8 h-8 aspect-square bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                    <FaLocationDot />
                  </span>
                  <div className="block">
                    <h4 className="text-base  text-indigo-600 mb-2">
                      Choosing the starting and arrival points
                    </h4>
                  </div>
                </a>
              </li>
              <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
                <a className="flex items-center font-medium w-full  ">
                  <span className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
                    2
                  </span>
                  <div className="block">
                    <h4 className="text-base  text-indigo-600 mb-2">
                      Have any trust issue?
                    </h4>
                    <p className="text-sm text-gray-600 max-w-xs">
                      of courser we are here to guide you
                    </p>
                  </div>
                </a>
              </li>
              <li className="relative flex-1 ">
                <a className="flex items-start font-medium w-full  ">
                  <span className="w-8 h-8 bg-gray-50 border-2 relative z-10 border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-10 lg:h-10">
                    3
                  </span>
                  <div className="block">
                    <h4 className="text-base  text-gray-900 mb-2">
                      How can I reset my password?
                    </h4>
                  </div>
                </a>
              </li>
            </ol>
          </div>
          <div className="flex w-[70%] flex-col h-full">
            <div className="bg-[#33a82f] rounded-lg mb-2 p-4 h-full">field</div>
            <div className="bg-[#2c2ea0] rounded-lg p-4">step button</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
