import React, { createContext, useEffect, useState } from "react";

import { getMe } from "@/api/user";

import { getUserData, removeUserData, setUserData } from "../helpers";
import { useConfig } from "../hooks";
import {
  isEmailVerified,
  isOnGracePeriod,
  isProfileCompleted,
  verifySessionRoles,
} from "../supertokens/helpers";
import { UserContextType, UserType } from "../types";

interface Properties {
  children: React.ReactNode;
}

const userContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: Properties) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const appConfig = useConfig();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (
          appConfig &&
          (await verifySessionRoles(appConfig.user.supportedRoles))
        ) {
          let userInfo = await getUserData();

          // if not found in localStorage, get me user from api
          if (!userInfo) {
            const response = await getMe(appConfig.apiBaseUrl);

            userInfo = { ...response.data };

            if (appConfig.user.features?.signUp?.emailVerification) {
              userInfo.isEmailVerified = await isEmailVerified();
            }

            userInfo.isProfileCompleted = await isProfileCompleted();

            await setUserData(userInfo);
          }

          setUser(userInfo);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const updateUser = async (user: UserType | null) => {
    if (user) {
      const userData = {
        ...user,
      };

      if (appConfig.user.features?.signUp?.emailVerification) {
        userData.isEmailVerified = await isEmailVerified();
      }

      userData.isProfileCompleted = await isProfileCompleted();

      if (userData.isProfileCompleted === false) {
        userData.isOnGracePeriod = await isOnGracePeriod();
      }

      await setUserData(userData);

      setUser(userData);
    } else {
      removeUserData();
      setUser(null);
    }
  };

  return (
    <userContext.Provider value={{ user, loading, setUser: updateUser }}>
      {loading ? null : children}
    </userContext.Provider>
  );
};

export default UserProvider;

export { userContext };
