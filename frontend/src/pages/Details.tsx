import { useNavigate, useParams } from "react-router-dom";
import CountryCardDetails from "../components/CountryCardDetails";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import { useEffect } from "react";

const Details = () => {
  const navigate = useNavigate();
  const { countryDetails, getCountryDetails, loading } =
    useCountryContext() as CountryContextProps;
  const { countryId } = useParams<{ countryId: string }>(); // Get countryId from URL params

  useEffect(() => {
    if (countryId) {
      getCountryDetails(countryId);
    }
  }, [countryId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <p className="text-center font-Mali mt-20">Loading country details...</p>
    );
  }

  if (!countryDetails) {
    return (
      <p className="text-center font-Mali mt-20">Not country details found</p>
    );
  }

  return (
    <CountryCardDetails
      countryDetails={countryDetails}
      handleBack={handleBack}
    />
  );
};

export default Details;
