import "react-datepicker/dist/react-datepicker.css";
import { svg } from "../../../../assets/image";
import Stepper from "./content/stepper/Stepper";

const Course = () => {
  return (
    <div className="h-full flex flex-col justify-evenly w-full text-myColor">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full justify-center items-center">
        <div className="h-full w-[55%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="w-[45%] flex h-full">
          <div className="bg-white w-full">
            <Stepper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
