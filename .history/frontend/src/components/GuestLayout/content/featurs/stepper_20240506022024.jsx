import React, { useEffect, useState } from "react";

function Stepper() {
  const NUMBER_OF_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <div className={`${currentStep === 1 ? `` : `hidden`}`}>step 1</div>
      <div className={`${currentStep === 2 ? `` : `hidden`}`}>step 2</div>
      <div className={`${currentStep === 3 ? `` : `hidden`}`}>step 3</div>
      <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
    </>
  );
}

export default Stepper;
