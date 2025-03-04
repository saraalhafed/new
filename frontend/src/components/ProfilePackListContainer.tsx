import { useEffect, useState } from "react";
import { IUser } from "../types/context";
import { UserPackList } from "../types/profile";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import ProfilePackListCard from "./ProfilePackListCard";
import ProfilePackListmodal from "./ProfilePackListModal";

interface ProfilePackListContainerProps {
  userPackLists: UserPackList[] | [];
  setUserPackLists: (data: UserPackList[]) => void ;
  userData: IUser | null;
  setUserData: (data: IUser) => void ;
  updateUserPackList: (
    userId: string,
    userPackListId: string | undefined,
    token: string,
    userData: IUser | null,
    setUserData: (data: IUser) => void,
    updatedUserPackList: UserPackList
  ) => Promise<void>;
  deleteUserPackList: (
    userId: string,
    userPackListId:string | undefined,
    token: string,
    userData: IUser | null,
    setUserData: (data:IUser)=> void
  ) => Promise<void> /* from  */;
}

const ProfilePackListContainer = ({
  userPackLists,
  setUserPackLists,
  userData,
  setUserData,
  updateUserPackList,
  deleteUserPackList,

}: ProfilePackListContainerProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [open, setOpen] = useState(false);
  const [selectedPackList, setSelectedPackList] = useState<UserPackList | null>(
    null
  );

  const [addNew, setAddNew] = useState<boolean>(false); // This state shows if it is added a new list (update the default packList),add from the modal or add from AddNewList btn

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = (userPackList: UserPackList) => {
    setOpen(true);
    const copiedPackList = { ...userPackList, items: [...userPackList.items] };
    const { _id, ...copyWithoutId } = copiedPackList;
    if(addNew){
      setSelectedPackList(copyWithoutId); // Copied userPackList (shallow copy)
    }else{
      setSelectedPackList(copyWithoutId); 
    }
    setSelectedPackList(copiedPackList); 
  };


  const handleDelete = (userPackList: UserPackList) => {
    const userPackListId= userPackList._id;
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
    deleteUserPackList( userId,userPackListId, token,userData, setUserData)
  };
console.log()

  const addUserPackList = async (
    userId: string,
    selectedPackList: UserPackList | null,
    token: string,
    userData: IUser | null
  ) => {

    if (!selectedPackList || !userData) {
      console.error("Missing selectedPackList or userData");
      return;
    }
    try {

      // Merge new packlist with existing ones
   
     const updatedPackLists = [...(userData.userPackLists || []), selectedPackList]

     console.log(updatedPackLists);
        
      const { data } = await axios.put(
        `${BASE_URL}/api/users/${userId}`,
        { userPackLists: updatedPackLists },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(data.data);
      setUserPackLists(userPackLists);
      toast.success("you added a new PackList!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }; 

  const handleAddNewList = ([]) => {
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
  const getDefaultPackList = async (PackListId:string) => {
      try {
        const { data } = await axios({
          url: `${BASE_URL}/api/packlist/${PackListId}`,
          method: "GET",
        });
        setSelectedPackList(data.data);
        toast.success("the default data is here !");
        // Call addUserPackList AFTER state is updated
    
     console.log(data.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    getDefaultPackList(defaultPackListId);
    console.log(selectedPackList);
    openModal(selectedPackList);
    addUserPackList(userId,selectedPackList,token,userData)
    console.log(selectedPackList);
  }
  console.log(selectedPackList);
  console.log(userPackLists);

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
    if (currentIndex + cardsPerView < userPackLists.length) {
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
            {userPackLists 
              .slice(currentIndex, currentIndex + cardsPerView)
              .map(( userPackList, index) => (
                <div key={index} className="  rounded-lg  lg:text-lg">
                  <ProfilePackListCard
                   userPackList={userPackList}
                    handleDelete={() => handleDelete(userPackList)}
                    openModal={() => openModal(userPackList)}
                    userData={userData}
                  />
                </div>
              ))}
          </div>

           {/* Right Button */}
                    {currentIndex + cardsPerView < userPackLists.length && (
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
                    onClick={()=> handleAddNewList([])}
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
                 <ProfilePackListmodal
                  open={open}
                  closeModal={closeModal}
                  selectedPackList={selectedPackList}
                  userData={userData}
                  setUserData={ setUserData}
                  addUserPackList={ addUserPackList}
                  updateUserPackList={updateUserPackList}
                  addNew={addNew}
                /> 
              </div>
            );
          };
          
export default ProfilePackListContainer;
