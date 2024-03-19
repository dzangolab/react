import React from "react";
import { UserContextType } from "../types";
interface Properties {
    children: React.ReactNode;
}
declare const userContext: React.Context<UserContextType | null>;
declare const UserProvider: ({ children }: Properties) => React.JSX.Element;
export default UserProvider;
export { userContext };
//# sourceMappingURL=UserProvider.d.ts.map