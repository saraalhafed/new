import { createContext, ReactNode, useContext, useState } from "react";
import { UserPackList } from "../types/profile";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "../types/context";

export interface ProfileContextProps {
  userPackLists: UserPackList[] | [];
  setUserPackLists: (data: UserPackList[]) => void;
  getUserPackLists: (userId: string, token: string) => Promise<void>;
  updateUserPackList: (
    userId: string,
    userPackListId: string,
    token: string,
    userData: IUser | null,
    setUserData: (data: IUser) => void,
    updatedUserPackList: UserPackList
  ) => Promise<void>;
  deleteUserPackList: (
    userId: string,
    userPackListId: string,
    token: string,
    userData: IUser | null,
    setUserData: (data: IUser) => void
  ) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  /* const [profile, setProfile] = useState<Profile | null>(null); */
  const [userPackLists, setUserPackLists] = useState<UserPackList[] | []>([]);

  // functions for userpackLists sections
  const getUserPackLists = async (userId: string, token: string) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPackLists(data.data.userPackLists);
      console.log(userPackLists);
    } catch (error) {
      console.error("Get Profile Error:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const updateUserPackList = async (
    userId: string,
    userPackListId: string | undefined,
    token: string,
    userData: IUser | null,
    setUserData: (data: IUser) => void,
    updatedUserPackList: UserPackList
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userId}/packlists/${userPackListId}`,
        { userPackLists: updatedUserPackList}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("befor update",response.data.userPackLists)
      setUserData(response.data.user)
      setUserPackLists(response.data.userPackLists);
      console.log("after update",response.data.userPackLists)
      console.log("after update",response.data.userPackList)
      toast.success("PackList updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const deleteUserPackList = async (
    userId: string,
    userPackListId: string,
    token: string,
    userData: IUser | null,
    setUserData: (data: IUser) => void
  ) => {
    if (!userPackListId || !userData) {
      console.error("Missing packListId or userData");
    }
    console.log(userPackLists);
    console.log(userData);
    try {
      const updatedPackLists =
        userData?.userPackLists?.filter(
          (userPackList) => userPackList.id !== userPackListId
        ) || [];

      const { data } = await axios.delete(
        `${BASE_URL}/api/users/${userId}/packlists/${userPackListId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data.data);
      // Update frontend state
      setUserData(data.data);

      console.log(userData?.userPackLists);
      console.log(updatedPackLists);

      setUserPackLists(updatedPackLists);

      console.log(updatedPackLists);
      toast.success("PackList removed successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const value: ProfileContextProps = {
    userPackLists,
    setUserPackLists,
    getUserPackLists,
    updateUserPackList,
    deleteUserPackList,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const UseProfileContext = () => useContext(ProfileContext);
