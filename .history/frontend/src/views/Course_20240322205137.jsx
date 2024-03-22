import React from "react";
import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="flex absolute top-[80px] bottom-0 w-full">
      <header className="bg-[#B4ECC4] p-10"></header>
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
