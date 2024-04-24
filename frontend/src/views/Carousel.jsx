import React, { useEffect, useState } from "react";

const Carousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentSlide = document.getElementById(`slide-${activeIndex}`);
    if (currentSlide) currentSlide.classList.remove("hidden");
  }, [activeIndex]);

  const toRight = () => {
    const nextSlide = document.getElementById(
      `slide-${(activeIndex + 1) % slides.length}`
    );
    const currentSlide = document.getElementById(`slide-${activeIndex}`);
    if (nextSlide) nextSlide.classList.remove("hidden");
    if (currentSlide) currentSlide.classList.add("hidden");
  };

  const toLeft = () => {
    const prevSlide = document.getElementById(
      `slide-${(activeIndex - 1 + slides.length) % slides.length}`
    );
    const currentSlide = document.getElementById(`slide-${activeIndex}`);
    if (prevSlide) prevSlide.classList.remove("hidden");
    if (currentSlide) currentSlide.classList.add("hidden");
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % slides.length);
    toRight();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="flex h-full items-center flex-row w-full justify-between ">
      <button className="hidden" onClick={prevSlide}>
        <span className="">Previous</span>
      </button>
      <div className="flex pl-20 overflow-hidden h-full w-full item-center justify-center">
        {slides.map((slide, index) => (
          <div
            className="flex h-full hidden fadeInDown animated w-full items-center justify-center flex-row"
            key={slide.id}
            id={`slide-${index}`}
          >
            {slide.content}
          </div>
        ))}
      </div>
      <button className="hidden" onClick={nextSlide}>
        <span className="">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
