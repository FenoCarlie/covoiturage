import React from "react";
import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="flex h-screen w-full bg-black">
      <div></div>
      <div>
        <img className="w-[100%]" src={svg.step} alt="image" />
      </div>
    </div>
  );
}

export default Course;
