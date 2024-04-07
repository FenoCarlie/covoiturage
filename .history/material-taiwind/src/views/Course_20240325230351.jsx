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
        <div className="flex flex-col w-[45%] mr-7 p-5">
          <div className="bg-[#e0e0e0] rounded-lg mb-2 p-4 h-full"></div>
          <div className="bg-[#fcfcfc] w-full px-24 py-4">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step onClick={() => setActiveStep(0)}>
                <FaLocationDot className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 0 ? "blue-gray" : "gray"}
                  >
                    Step 1
                  </Typography>
                  <Typography
                    color={activeStep === 0 ? "blue-gray" : "gray"}
                    className="font-normal"
                  >
                    Details about yout account.
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(1)}>
                <FaRegCalendarAlt className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                  >
                    Step 2
                  </Typography>
                  <Typography
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                    className="font-normal"
                  >
                    Details about yout account.
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(2)}>
                <BsCardChecklist className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 2 ? "blue-gray" : "gray"}
                  >
                    Step 3
                  </Typography>
                  <Typography
                    color={activeStep === 2 ? "blue-gray" : "gray"}
                    className="font-normal"
                  >
                    Details about yout account.
                  </Typography>
                </div>
              </Step>
            </Stepper>
            <div className="mt-32 flex justify-between">
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
