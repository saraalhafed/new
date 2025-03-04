import { createContext, ReactNode, useContext, useState } from "react";
import { Country } from "../types/countries";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

export interface CountryContextProps {
  getCountries: () => Promise<void>;
  countries: Country[];
  getCountryDetails: (countryId: string) => Promise<void>;
  countryDetails: Country | null;
  loading: boolean;
}
const CountryContext = createContext<CountryContextProps | null>(null);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryDetails, setCountryDetails] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);

  const getCountries = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/country/`,
        method: "GET",
      });
      setCountries(data.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const getCountryDetails = async (countryId: string) => {
    try {
      setLoading(true);

      const userString = sessionStorage.getItem("user");

      if (!userString) {
        console.log("No user data found in session storage");
        toast.error("Please login first");
        return;
      }

      // Log the parsed user data
      const user = JSON.parse(userString);

      const token = user.token;

      const { data } = await axios({
        url: `${BASE_URL}/api/country/${countryId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCountryDetails(data.data);
    } catch (error) {
      console.error("Full error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to fetch country details"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const value: CountryContextProps = {
    getCountries,
    countries,
    getCountryDetails,
    countryDetails,
    loading,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};

