import React, { createContext, useEffect, useState } from "react";

import { getUserData, setUserData } from "../helpers";
import { useConfig } from "../hooks";
import { getUserRoles, verifySessionRoles } from "../supertokens/helpers";
import { UserContextType, UserType } from "../types";

interface Properties {
  children: React.ReactNode;
}

const userContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: Properties) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
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

  const setUserWithRoles = async (user: UserType | undefined) => {
    let roles;

    if (user) {
      roles = await getUserRoles();

      await setUserData({ ...user, roles: roles });
      setUser({ ...user, roles: roles });
    } else {
      setUser(undefined);
    }
  };

  return (
    <userContext.Provider value={{ user, loading, setUser: setUserWithRoles }}>
      {loading ? null : children}
    </userContext.Provider>
  );
};

export default UserProvider;
export { userContext };
