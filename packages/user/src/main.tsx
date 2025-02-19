import ConfigProvider from "./context/ConfigProvider";
import UserProvider from "./context/UserProvider";
import { superTokens } from "./supertokens";
import { UserWrapperProperties } from "./types/types";

export const UserWrapper = ({ config, children }: UserWrapperProperties) => {
  superTokens(config);

  return (
    <ConfigProvider config={config}>
      <UserProvider>{children}</UserProvider>
    </ConfigProvider>
  );
};
