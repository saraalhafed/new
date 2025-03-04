import { Country } from "../types/countries";

interface CarouselCardProps {
  handleClick: (countryId: string) => void;
  country: Country;
  cardsPerSlide: number;
}

const CarouselCard = ({
  country,
  cardsPerSlide,
  handleClick,
}: CarouselCardProps) => {
  return (
    <div
      className={`container mx-auto md:w-[22.5rem] lg:w-[27rem] xl:w-[33rem] mustard font-Mali ${
        cardsPerSlide === 2 ? "md:w-1/2" : "w-11/12"
      }`}
    >
      <div className="max-w w-11/12 rounded-lg overflow-hidden shadow-lg text-center bg-mustard bg-opacity-60 mx-auto">
        <img
          className="h-[12.5rem] object-containt w-full"
          src={`http://127.0.0.1:8000` + country.images[0]}
          alt={country.name}
        />
        <div className="px-2 pt-3 pb-2 lg:pb-0 text-marine-blue">
          <h4 className="font-bold text-xl mb-1 md:text-2xl">{country.name}</h4>
          <p className="text-base lg:text-lg">{country.capital_city}</p>
        </div>
        <button
          type="button"
          onClick={() => handleClick(country._id)}
          className=" text-white px-2 py-2 mb-3 text-sm lg:text-md xl:text-lg lg:mt-4 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
