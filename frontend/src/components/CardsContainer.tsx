import { useNavigate } from "react-router-dom";
import CountryCard from "./CountryCard";

const CardsContainer = ({ countries }) => {
  const navigate = useNavigate();

  const handleClick = (countryId: string) => {
    navigate(`/details/${countryId}`);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="justify-items-center">
      <h2 className="font-Mali text-center mt-10 text-xl md:text-2xl lg:text-3xl font-bold text-marine-blue">
        Travel destinations
      </h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grids-col-4 gap-y-8 mt-10 mb-8">
        {countries.map((country) => (
          <div
            key={country._id}
            className="mx-6 xl:mx-0 col-span-full md:col-span-1 lg:col-span-1"
          >
            <CountryCard country={country} handleClick={handleClick} />
          </div>
        ))}
      </div>
      <button
        className="bg-marine-blue text-mustard px-4 md:px-5 py-2 text-center text-base md:text-lg rounded-lg font-medium hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue mb-6 font-Mali"
        onClick={handleBackToHome}
      >
        Back
      </button>
    </div>
  );
};

export default CardsContainer;
