import React from "react";
import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="absolute top-[80px] bottom-0 w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-start justify-center">
        <h1 className="text-2xl">Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex">
        <div>
          <></>
        </div>
        <img className="w-[40%]" src={svg.step} alt="image" />
      </div>
    </div>
  );
}

export default Course;
