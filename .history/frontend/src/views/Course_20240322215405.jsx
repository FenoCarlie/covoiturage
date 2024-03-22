import { svg } from "../assets/image.js";
import { useState } from "react";

function Course() {
  return (
    <div className="absolute top-[80px] bottom-0 w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex">
        <img className="w-[35%]" src={svg.step} alt="image" />
        <div className="w-[50%] h-full"></div>
      </div>
    </div>
  );
}

export default Course;
