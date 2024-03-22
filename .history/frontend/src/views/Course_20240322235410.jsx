import { svg } from "../assets/image.js";

const Course = () => {
  return (
    <div className="h-full flex flex-col justify-evenly w-full">
      <header className="bg-[#B4ECC4] p-10 flex items-center justify-center">
        <h1 className="text-2xl">Your trip, cheaper and more fun!</h1>
      </header>
      <div className="flex h-full items-center">
        <div className="h-full w-[55%] flex ">
          <img className="m-auto w-[60%]" src={svg.step} alt="image" />
        </div>
        <div className="flex h-full w-[45%] p-5">
          <div className="bg-[#aeb63d] w-[30%]">step</div>
          <div className="flex bg-[#c55454] w-[70%] flex-col h-full">
            <div className="bg-[#33a82f] ">field</div>
            <div className="bg-[#2c2ea0] h-[10%]">step button</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
