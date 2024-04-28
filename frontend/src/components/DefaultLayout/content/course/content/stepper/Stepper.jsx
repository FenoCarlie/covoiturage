import React, { useEffect, useState } from "react";

function Stepper({ steps, data }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const currentStep = document.getElementById(`step-${activeStep}`);
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStep) currentStep.classList.remove("hidden");
    if (currentStepBar) {
      currentStepBar.classList.remove("text-gray-500/50");
      currentStepBar.classList.add("text-myColor");
    }
  }, [activeStep]);

  const toRight = () => {
    const nextStep = document.getElementById(
      `step-${(activeStep + 1) % steps.length}`
    );
    const nextStepBar = document.getElementById(
      `stepBar-${(activeStep + 1) % steps.length}`
    );
    const currentStep = document.getElementById(`step-${activeStep}`);
    if (nextStep) {
      nextStep.classList.remove("hidden");
      nextStep.classList.add("animate-fade-down");
    }
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (nextStepBar) nextStepBar.classList.remove("text-gray-500/50");
    if (currentStepBar) currentStepBar.classList.add("text-myColor");
  };

  const toLeft = () => {
    const prevStep = document.getElementById(
      `step-${(activeStep - 1 + steps.length) % steps.length}`
    );
    const currentStep = document.getElementById(`step-${activeStep}`);
    if (prevStep) {
      prevStep.classList.remove("hidden");
      prevStep.classList.add(
        "animate-fade-up",
        "animate-once",
        "animate-ease-in"
      );
    }
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStepBar) {
      currentStepBar.classList.remove("text-myColor");
      currentStepBar.classList.add("text-gray-500/50");
    }
  };

  const prevStep = () => {
    setActiveStep((activeStep - 1 + steps.length) % steps.length);
    toLeft();
  };

  const nextStep = () => {
    setActiveStep((activeStep + 1) % steps.length);
    toRight();
  };

  return (
    <div className="flex p-3 h-full justify-center flex-col w-full">
      <div className="flex m-2 flex-row px-[50px] h-[75%]">
        <div className="flex flex-col justify-between w-[35%] mr-2 border-r p-4 ">
          {steps.map((step, index) => (
            <div key={step.id} className="">
              <ul className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li
                  id={`stepBar-${index}`}
                  className={`flex items-center space-x-2.5 rtl:space-x-reverse text-gray-500/50
                      `}
                >
                  <span className="flex items-center justify-center w-8 h-8 border rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <span>
                    <h3 className="text-lg font-bold leading-tight">
                      {step.info.name}
                    </h3>
                    <p className="">{step.info.description}</p>
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-2 w-[65%] h-full">
          {steps.map((step, index) => (
            <div
              key={step.id}
              id={`step-${index}`}
              className={`flex ${
                activeStep === index
                  ? "flex ml-10 items-start h-full flex-col"
                  : "hidden"
              }`}
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>
      <div className={`p-3 flex px-[200px] text-gl justify-between`}>
        <button
          onClick={activeStep === 0 ? "" : prevStep}
          className={`text-white p-2 border rounded-lg px-[30px] ${
            activeStep === 0
              ? "opacity-50 bg-sky-500"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          <span>Previous</span>
        </button>
        {activeStep === steps.length - 1 ? (
          <button
            className="text-white p-2 bg-emerald-500 hover:bg-emerald-600 border rounded-lg px-[30px]"
            onClick={() => {}}
          >
            <span>Validate</span>
          </button>
        ) : (
          <button
            className="text-white bg-sky-500 hover:bg-sky-600 p-2 border rounded-lg px-[30px]"
            onClick={nextStep}
          >
            <span>Next</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Stepper;
