import React from "react";
import svg from "../assets/svg.step"; // assuming the svg is imported from an external file

const Course = () => {
  return (
    <div className="h-full bg-[#75b439] text-white relative">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex items-center">
        <img
          className="w-[35%] absolute left-0 top-[50%] translate-y-[-50%]"
          src={svg.step}
          alt="image"
        />
        <div className="w-full bg-black bg-opacity-50 p-5">
          <p>Stepper</p>
        </div>
      </div>
    </div>
  );
};

export default Course;
