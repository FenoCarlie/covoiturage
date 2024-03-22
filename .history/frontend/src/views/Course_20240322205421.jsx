import React from "react";
import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="absolute top-[80px] bottom-0 w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-start justify-center size-5">
        <h1>Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex">
        <div>
          <></>
        </div>
        <img className="w-[50%]" src={svg.step} alt="image" />
      </div>
    </div>
  );
}

export default Course;
