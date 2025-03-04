import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Country } from "../types/countries";
import CarouselCard from "./CarouselCard";

interface CarouselProps {
  countries: Country[];
}

const Carousel: React.FC<CarouselProps> = ({ countries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const sortedCountries = countries.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const latestCountries = sortedCountries.slice(0, 8);

  // Group cards into slides
  const groupedSlides = [];
  for (let i = 0; i < latestCountries.length; i += cardsPerSlide) {
    groupedSlides.push(latestCountries.slice(i, i + cardsPerSlide));
  }

  const totalSlides = groupedSlides.length;

  const prevSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex + 1);
  };

  const handleClick = (countryId: string) => {
    navigate(`/details/${countryId}`);
  };

  return (
    <div className="mt-10 mb-10">
      <h2 className=" justify-items-center font-Mali text-center mb-3 md:mb-6 text-xl md:text-2xl lg:text-3xl font-bold text-marine-blue">
        Travel destinations
      </h2>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {groupedSlides.map((slide, index) => (
            <div key={index} className="w-full flex flex-shrink-0 p-4">
              {slide.map((country) => (
                <CarouselCard
                  key={country._id}
                  country={country}
                  handleClick={handleClick}
                  cardsPerSlide={cardsPerSlide}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <button
            className={
              "absolute left-2 md:left-1 lg:left-7 xl:left-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
            }
            onClick={prevSlide}
          >
            ❮
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button
            className={
              "absolute right-2 md:right-1 lg:right-7 xl:right-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
            }
            onClick={nextSlide}
          >
            ❯
          </button>
        )}

        {/* Progress bar */}
        <div className="flex justify-center md:mt-5 mb-4 space-x-2">
          {groupedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
                currentIndex === index ? "bg-marine-blue" : "bg-gray-200"
              } transition-all duration-500`}
            ></button>
          ))}
        </div>
      </div>
      <Link to={"/travel-destinations"}>
        <p className="flex justify-end text-base text-marine-blue text-center pt-4 hover:underline font-semibold mr-5 md:mr-12 lg:mr-14">
          Explore all travel destinations→
        </p>
      </Link>
    </div>
  );
};

export default Carousel;
