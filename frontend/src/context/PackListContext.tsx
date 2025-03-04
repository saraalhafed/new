import { createContext, ReactNode, useContext, useState } from "react";
import {PackList} from "../types/packlist";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "../types/context";

 export interface PackListContextProps {
    getPackLists: () => Promise<void>;  
    packLists:  PackList[] | [],
    userData: IUser | null,
    setUserData: (data: IUser) => void;
};

const PackListContext = createContext<PackListContextProps | undefined>(undefined);

export const PackListProvider = ({children}: {children: ReactNode}) => {

 const [ packLists, setPackLists]= useState<PackList[] | []>([]);// it holds just the original packList in home 
 const [userData,setUserData]=useState< IUser| null>(null) // It holds the currently logged-in user's information ,this state will passed to 2 pages home and profiler so it is better to have it here in top level in this provider

 const getPackLists = async() => {
    try {
        const {data} = await axios({
            url: `${BASE_URL}/api/packlist`,
            method: "GET",
        })
        setPackLists(data.data);
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        }
      }
};
 
const value: PackListContextProps = {
    getPackLists,
    packLists,
    userData,
    setUserData,
  };

  return <PackListContext.Provider value={value}>{children}</PackListContext.Provider>;
}

export const usePackListContext = () => useContext(PackListContext);
