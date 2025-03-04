import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import { usePackListContext } from "../context/PackListContext";
import { PackListContextProps } from "../context/PackListContext";
import HeroSection from "../components/HeroSection";
import BlurbCtaSection from "../components/BlurbCtaSection";
import Carousel from "../components/Carousel";
import PackListContainer from "../components/PackListContainer";
import { useAuth } from "../context/AuthContext";
import { AuthContextProps } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { countries = [], getCountries } = useCountryContext() as CountryContextProps;
  const { packLists = [], getPackLists, userData, setUserData} = usePackListContext() as PackListContextProps;
  
  const {userInfo} = useAuth()as AuthContextProps;

  const handleClick = () => {
    navigate("/about");
  };
  
  const handleClickCtaButton = () => {
    navigate("/register");
  };

  useEffect(() => {
    getCountries();
    getPackLists(); 
  }, []);

  // Get firebaseToken from sessionstorage
  const firebaseToken =sessionStorage.getItem("firebaseToken");
  
  useEffect(() => {
    const userstring = sessionStorage.getItem("user");
    if (userstring) {
      const user = JSON.parse(userstring);
      setUserData(user);  // same user will update his data it will update the state userData 
    }
  }, [userInfo,firebaseToken]); // Everytime user changes, this variables include just user data (login ) not all user data so it will  trigger the useeffect just after login ,not after each changing in userData
  console.log("userData", userData);
  
  /* 
  props = {packLists, userData, setUserData,} */
  return (
    <>
      <HeroSection handleClick={handleClick} />
      <BlurbCtaSection handleClickCtaButton={handleClickCtaButton} />
      <Carousel countries={countries} />
      <PackListContainer packLists={packLists} userData={userData} setUserData={setUserData}/>
    </>
  );
};

export default Home;
