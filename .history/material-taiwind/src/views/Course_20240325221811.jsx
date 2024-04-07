import { svg } from "../assets/image.js";
import { FaLocationDot } from "react-icons/fa6";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

const Course = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="h-full flex flex-col justify-evenly w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full items-center">
        <div className="h-full w-[55%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="flex w-[45%] mr-7 p-5">
          <div className="bg-[#fffdfd] p-4 w-[50%] h-[75%] rounded-lg mr-2">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            ></Stepper>
          </div>
          <div className="flex w-[50%] flex-col">
            <div className="bg-[#e0e0e0] rounded-lg mb-2 p-4 h-full">
              {/* Add content for the field component here */}
            </div>
            <div className="bg-[#e0e0e0] justify-between flex rounded-lg py-4 px-10">
              <Button onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
