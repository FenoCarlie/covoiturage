import React, { useEffect, useState } from "react";

function stepper() {
  const NUMBER_OF_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <div className={`${currentStep === 1 ? `` : `hidden`}`}>step</div>
    </>
  );
}

export default stepper;
