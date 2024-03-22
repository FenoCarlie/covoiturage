import { svg } from "../assets/image.js";

const Course = () => {
  return (
    <div className="h-full flex flex-col justify-evenly bg-[#75b439] w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex h-full bg-[#af3b3b] items-center">
        <div className="h-full w-[50%]">
          <img className="w-[70%]" src={svg.step} alt="image" />
        </div>
        <div className="h-full w-[50%] bg-black">stepper</div>
      </div>
    </div>
  );
};

export default Course;
