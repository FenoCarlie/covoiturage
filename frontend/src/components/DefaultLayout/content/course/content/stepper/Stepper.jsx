import React, { useEffect, useState } from "react";

function Stepper({ steps, data }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const currentStep = document.getElementById(`step-${activeStep}`);
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStep) currentStep.classList.remove("hidden");
    if (currentStepBar) {
      currentStepBar.classList.remove("text-gray-500/50");
      currentStepBar.classList.add("text-sky-500");
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
    if (nextStep) nextStep.classList.remove("hidden");
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (nextStepBar) nextStepBar.classList.remove("text-gray-500/50");
    if (currentStepBar) currentStepBar.classList.add("text-sky-500");
  };

  const toLeft = () => {
    const prevStep = document.getElementById(
      `step-${(activeStep - 1 + steps.length) % steps.length}`
    );
    const currentStep = document.getElementById(`step-${activeStep}`);
    if (prevStep) prevStep.classList.remove("hidden");
    if (currentStep) currentStep.classList.add("hidden");
    const currentStepBar = document.getElementById(`stepBar-${activeStep}`);
    if (currentStepBar) {
      currentStepBar.classList.remove("text-sky-500");
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
    <div className="flex p-3 bg-slate-500 flex-col w-full">
      <div className="flex h-[150px] flex-col px-[50px]">
        <div className=" mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center bg-slate-400 justify-center flex-col"
            >
              <div
                id={`step-${index}`}
                className={`flex ${
                  activeStep === index ? "" : "hidden"
                } w-full`}
              >
                {step.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between border p-4 bg-white rounded-lg">
          {steps.map((step, index) => (
            <div key={step.id} className="">
              <ul className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li
                  id={`stepBar-${index}`}
                  className={`flex items-center space-x-2.5 rtl:space-x-reverse text-gray-500/50
                      `}
                >
                  <span className="flex items-center justify-center w-8 h-8 border rounded-full shrink-0">
                    {step.icone}
                  </span>
                  <span>
                    <h3 className="font-medium leading-tight">
                      {step.info.name}
                    </h3>
                    <p className="text-sm">{step.info.description}</p>
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`p-3 flex w-full px-[200px] text-gl justify-between`}>
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
