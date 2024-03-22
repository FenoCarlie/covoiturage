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
          <div className="bg-[#aeb63d] p-4 rounded-lg mr-2 w-[30%]">step</div>
          <div className="flex w-[70%] flex-col h-full">
            <div className="bg-[#33a82f] rounded-lg p-4 h-full">field</div>
            <div className="bg-[#2c2ea0] p-4">step button</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
