import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "./store";

interface Properties {
  children: ReactNode;
}

const UserProvider = ({ children }: Properties) => {
  return <Provider store={store}>{children}</Provider>;
};

export default UserProvider;
