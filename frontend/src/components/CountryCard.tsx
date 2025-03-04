import { Country } from "../types/countries";

interface CountryCardProps {
  handleClick: (countryId: string) => void;
  country: Country;
}

const CountryCard = ({ country, handleClick }: CountryCardProps) => {
  return (
    <div className="container mx-auto xl:w-[31rem] mustard font-Mali">
      <div className="max-w rounded-lg overflow-hidden shadow-lg text-center bg-mustard bg-opacity-60">
        <img
          className="h-[12.5rem] object-containt w-full"
          src={`http://127.0.0.1:8000` + country.images[0]}
          alt={country.name}
        />
        <div className="px-6 pt-3 pb-2 lg:pb-0 text-marine-blue">
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

export default CountryCard;
