import { useEffect } from "react";
import { AuthContextProps, useAuth } from "../context/AuthContext";
import {
  ProfileContextProps,
  UseProfileContext,
} from "../context/ProfileContext";

import {
  PackListContextProps,
  usePackListContext,
} from "../context/PackListContext";
import ProfilePackListContainer from "../components/ProfilePackListcontainer";

const Profile = () => {
  const {
    userPackLists = [],
    setUserPackLists,
    getUserPackLists,
    updateUserPackList,
    deleteUserPackList,
  } = UseProfileContext() as ProfileContextProps;

  const { userData, setUserData } =
    usePackListContext() as PackListContextProps;

  const { userInfo } = useAuth() as AuthContextProps;

  // Get firebaseToken from sessionstorage
  const firebaseToken = sessionStorage.getItem("firebaseToken");

  useEffect(() => {
    const userstring = sessionStorage.getItem("user");
    if (!userstring) {
      console.error("you have to login");
      return;
    }
    const user = JSON.parse(userstring);
    const userId = user._id;
    const token = user.token;
    setUserData(user);

    getUserPackLists(userId, token);
  }, [userInfo, firebaseToken]);
  /*   useEffect(() => {
    const userstring = sessionStorage.getItem("user");
    if (userstring) {
      const user = JSON.parse(userstring);
      setUserData(user);
    }
  }, [userInfo, firebaseToken]); */

  return (
    <div>
      <ProfilePackListContainer
        userPackLists={userPackLists}
        setUserPackLists={setUserPackLists}
        userData={userData}
        setUserData={setUserData}
        updateUserPackList={updateUserPackList}
        deleteUserPackList={deleteUserPackList}
      />
    </div>
  );
};

export default Profile;
