import { Country } from "../types/countries";

interface CountryCardDetailsProps {
  handleBack: () => void;
  countryDetails: Country;
}

const CountryCardDetails = ({
  countryDetails,
  handleBack,
}: CountryCardDetailsProps) => {
  return (
    <>
      <h1 className="font-Mali text-center text-light-pink text-3xl md:text-4xl lg:text-5xl font-bold pt-8 pb-10">
        Discovering {countryDetails.name}
      </h1>
      <div className="container mx-auto max-w-[80vw] lg:w-[42rem] xl:w-[48rem] font-Mali pb-10">
        <div className="max-w rounded-lg overflow-hidden shadow-lg text-center bg-light-pink">
          <img
            className="h-[12.5rem] object-containt w-full"
            src={`http://127.0.0.1:8000` + countryDetails.images[0]}
            alt={countryDetails.name}
          />
          <div className="px-6 pt-3 pb-3 lg:pb-4 text-marine-blue">
            <h4 className="font-bold text-xl md:text-2xl drop-shadow-lg">
              {countryDetails.name.toUpperCase()}
            </h4>
            <p className="font-bold text-base lg:text-lg drop-shadow-lg">
              {countryDetails.capital_city}
            </p>
          </div>
          <div className="text-marine-blue text-left px-5 md:px-8 text-sm md:text-base pb-4">
            <p>
              <span className="font-semibold">★ Official language/s: </span>
              {countryDetails.language}
            </p>
            <p>
              <span className="font-semibold">★ Currency: </span>
              {countryDetails.currency}
            </p>
            <p>
              <span className="font-semibold">★ Religion/s: </span>
              {countryDetails.religion}
            </p>
            <p>
              <span className="font-semibold">★ Culture information: </span>
              {countryDetails.cultural_info}
            </p>
            <p>
              <span className="font-semibold">★ Food specialties: </span>
              {countryDetails.food_specialties}
            </p>
            <p>
              <span className="font-semibold">★ Emergency contacts: </span>
              {countryDetails.emergency_contacts}
            </p>
          </div>
          <button
            type="button"
            onClick={handleBack}
            className=" text-white px-2 py-2 mb-3 text-sm lg:text-md xl:text-lg lg:mt-4 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default CountryCardDetails;
