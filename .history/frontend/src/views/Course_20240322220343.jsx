import { svg } from "../assets/image.js";

function Course() {
  return (
    <div className="h-full w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Votre trajet, moins cher et plus sympa!</h1>
      </header>
      <div className="flex bg-[#af3b3b] items-center">
        <img className="w-[35%]" src={svg.step} alt="image" />
        <div className="w-full bg-black">stepper</div>
      </div>
    </div>
  );
}

export default Course;
