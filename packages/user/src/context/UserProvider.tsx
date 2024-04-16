import React, { createContext, useEffect, useState } from "react";

import { getUserData, setUserData } from "../helpers";
import { useConfig } from "../hooks";
import {
  getUserRoles,
  isUserVerified,
  verifySessionRoles,
} from "../supertokens/helpers";
import { Role, UserContextType, UserType } from "../types";

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
          const userInfo = await getUserData();

          if (userInfo) {
            setUser(userInfo);
          }
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
      const roles = await getUserRoles();

      const userData = {
        ...user,
        roles,
      };

      if (appConfig.user.features?.signUp?.emailVerification) {
        const isEmailVerified = await isUserVerified();

        userData.isEmailVerified = isEmailVerified;
      }

      await setUserData(userData);

      setUser(userData);
    } else {
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
