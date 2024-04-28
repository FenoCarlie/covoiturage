import Carousel from "./content/Carousel";
import { svg } from "../../assets/image";

function Home() {
  const slides = [
    {
      content: (
        <div className="">
          <h1 className="text-4xl mb-10 uppercase font-bold text-myColor">
            traveling with good company
          </h1>
          <p className="m-10 text-xl">
            Whether you're a driver or a passenger, enjoy your trip in good
            company and meet new people.
          </p>
        </div>
      ),
    },
    {
      content: (
        <div className="">
          <h1 className="text-4xl mb-10 uppercase font-bold text-myColor ">
            travel at lower prices
          </h1>
          <p className="m-10 text-xl">
            Save money by sharing your travel expenses
          </p>
        </div>
      ),
    },
    {
      content: (
        <div className="">
          <h1 className="text-4xl mb-10 uppercase font-bold text-myColor ">
            help reduce your carbon footprint
          </h1>
          <p className="m-10 text-xl">
            Help preserve the ozone layer by reducing your carbon footprint
          </p>
        </div>
      ),
    },
  ];
  /*  */

  return (
    <>
      <div className="border w-full flex flex-row justify-between h-full">
        <section className="w-[40%] p-3 h-full flex justify-center items-center">
          <Carousel slides={slides} />
        </section>
        <div className="h-full w-[60%] flex ">
          <img className="m-auto w-[100%]" src={svg.home} alt="image" />
        </div>
      </div>
    </>
  );
}

export default Home;
