import React from "react";
import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="flex absolute top-[80px] bottom-0 w-full">
      <header></header>
      <div className="flex">
        <img className="w-[50%]" src={svg.step} alt="image" />
      </div>
    </div>
  );
}

export default Course;
