import { verifySession } from "@/supertokens/login";
import React, { createContext, useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { UserContextType } from "../types";

interface Properties {
  appContext: "user" | "admin";
  children: React.ReactNode;
}

const userContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ appContext, children }: Properties) => {
  const [user, setUser] = useState<EmailPasswordUserType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (await verifySession(appContext)) {
          const userInfo = await Session.getAccessTokenPayloadSecurely();

          if (userInfo) {
            setUser(userInfo.user);
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
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
export { userContext };
