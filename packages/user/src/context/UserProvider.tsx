import React, { createContext, useEffect, useState } from "react";

import { getMe } from "@/api/user";

import { getUserData, removeUserData, setUserData } from "../helpers";
import { useConfig } from "../hooks";
import {
  isEmailVerified,
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
          const response = await getMe(appConfig.apiBaseUrl).catch(async () => {
            return { data: (await getUserData()) as UserType };
          });

          const userInfo = { ...response.data };

          if (appConfig.user.features?.signUp?.emailVerification) {
            userInfo.isEmailVerified = await isEmailVerified();
          }

          userInfo.isProfileCompleted = await isProfileCompleted();

          await setUserData(userInfo);

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

  const updateUser = async (_user: UserType | null) => {
    if (_user) {
      const userData = {
        ..._user,
      };

      if (appConfig.user.features?.signUp?.emailVerification) {
        userData.isEmailVerified = await isEmailVerified();
      }

      userData.isProfileCompleted = await isProfileCompleted();

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
