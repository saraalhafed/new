import { useState, useEffect } from "react";
import PackListCard from "./PackListCard";

import PackListModal from "./PackListModal";
import { PackList } from "../types/packlist";
import axios from "axios";
import { BASE_URL } from "../constants";
import { IUser } from "../types/context";
import { toast } from "react-toastify";
interface PackListContainerProps {
  packLists:  PackList[] | [],
  userData: IUser | null;
  setUserData: (data: IUser) => void;
  updateUser: (
    userId: string,
    selectedPackList: PackList,
    token: string,
    userData: IUser | null
  ) => Promise<void>;
}
const PackListContainer = ({
  packLists,
  userData,
  setUserData,
}: PackListContainerProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [open, setOpen] = useState(false);
  const [selectedPackList, setSelectedPackList] = useState<PackList | null>(
    null
  );

  const [addNew, setAddNew] = useState<boolean>(false); // This state shows if it is added a new list (update the default packList)

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = (packList: PackList) => {
    setOpen(true);
    const copiedPackList = { ...packList, items: [...packList.items] };
     const { _id, ...copyWithoutId } =  copiedPackList 
    setSelectedPackList(copyWithoutId); // Copied packList (shallow copy)
  };
  
  // Move updateUser outside submit
  const updateUser = async (
    userId: string,
    selectedPackList: PackList | null,
    token: string,
    userData: IUser | null
  ) => {
    try {
      // Merge new packlist with existing ones
      const updatedPackLists = [...userData.userPackLists, selectedPackList];

      const { data } = await axios.put(
        `${BASE_URL}/api/users/${userId}`,
        { userPackLists: updatedPackLists },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(data.data);
      toast.success("packList is updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const handleAdd = (packList: PackList) => {
    const copiedPackList = { ...packList, items: [...packList.items] };
    
    // This shallow copy, some how copy also the _id from the original packList here, so it ios necessary to destructure the data and send the packList to the user without _id
    const { _id, ...copyWithoutId } = copiedPackList ;
    setSelectedPackList(copyWithoutId); // This function updates the state after this function finishes
   
    const userstring = sessionStorage.getItem("user");
    if (!userstring) {
      console.error("you have to login");
      return;
    }
    const user = JSON.parse(userstring);
    const userId = user._id;
    const token = user.token; 
   
    if (!userData) {
      console.error("User Data is missing");
      return;
    } 

    updateUser(userId, copyWithoutId, token, userData); 
    // copyWithoutId is included instead of selectedPackList, because the state will update after the function runs
  };

  const handleAddNewList = () => {
    setAddNew(true);
   
  const userstring = sessionStorage.getItem("user");
  if (!userstring) {
    console.error("you have to login");
    return;
  }
  const user = JSON.parse(userstring);
  const userId = user._id;
  const token = user.token;
  
  if (!userData) {
    console.error("User Data is missing");
    return;
  }

    /* get the default packList from the backend getdefaultPackList()*/
    const defaultPackListId = "67bc61f1d52d552624756648";
    const getDefaultPackList = async (packListId: string) => {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/api/packlist/${packListId}`,
          method: "GET",
        });
        setSelectedPackList(data.data);
        toast.success("the default data is here !");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    getDefaultPackList(defaultPackListId);
    openModal(selectedPackList);
    updateUser(userId, selectedPackList, token, userData);
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3); // Large screens (lg)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2); // Medium screens (md)
      } else {
        setCardsPerView(1); // Small screens (sm)
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Navigation for carousel
  const handleNext = () => {
    if (currentIndex + cardsPerView < packLists.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-Mali text-center mt-10 text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-marine-blue">
        What do I need?
      </h2>

      {/* PackList Cards Container */}
      <div className="relative w-11/12 mt-6">
        <div className="flex justify-between items-center gap-4">
          {/* Left Button */}
          {currentIndex > 0 && (
            <button
              className="w-8 h-8 md:w-10 md:h-10 text-white bg-blue-water rounded-full flex items-center justify-center transition-colors"
              onClick={handlePrev}
            >
              &lt;
            </button>
          )}

          {/* Cards Display */}
          <div className=" mx-auto grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  lg:text-lg 2xl:gap-10">
            {packLists
              .slice(0, packLists.length - 1) //it is  used length just in case to add new packList in the future
              .slice(currentIndex, currentIndex + cardsPerView)
              .map((packList:PackList, index) => (
                <div key={index} className="  rounded-lg  lg:text-lg">
                  <PackListCard
                    packList={packList}
                    handleAdd={() => handleAdd(packList)}
                    openModal={() => openModal(packList)}
                    userData={userData}
                  />
                </div>
              ))}
          </div>

          {/* Right Button */}
          {currentIndex + cardsPerView < packLists.length && (
            <button
              className="w-8 h-8 md:w-10 md:h-10 text-white bg-blue-water rounded-full flex items-center justify-center transition-colors"
              onClick={handleNext}
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {/* Add New List Button */}
      <div className="text-center mt-6 mb-6">
        <button
          onClick={handleAddNewList}
          disabled={!userData}
          className={` ${
            !userData
              ? "bg-gray-200 px-2 py-2 rounded-lg text-black cursor-not-allowed"
              : "text-white px-2 py-2 mb-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          } `}
        >
          Add new List
        </button>
      </div>
      <PackListModal
        open={open}
        closeModal={closeModal}
        selectedPackList={selectedPackList}
        userData={userData}
        updateUser={updateUser}
        addNew={addNew}
      />
    </div>
  );
};

export default PackListContainer;
