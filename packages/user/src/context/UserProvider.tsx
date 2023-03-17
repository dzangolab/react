import React, { createContext, useEffect, useState } from "react";

import { getUserData } from "../helpers";
import { useConfig } from "../hooks";
import { verifySession } from "../supertokens/login";
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
          (await verifySession(
            appConfig.user.appContext,
            appConfig.user.redirectTo.appURL
          ))
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

  return (
    <userContext.Provider value={{ user, setUser, loading }}>
      {loading ? null : children}
    </userContext.Provider>
  );
};

export default UserProvider;
export { userContext };
