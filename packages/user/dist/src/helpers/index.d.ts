import type { DzangolabReactUserConfig, UserType } from "../types";
import type { DzangolabReactLayoutConfig } from "@dzangolab/react-layout";
declare const getHomeRoute: (user: UserType | null, layoutConfig: DzangolabReactLayoutConfig | undefined, userConfig: DzangolabReactUserConfig | undefined) => string | undefined;
declare const setUserData: (data: UserType) => void;
declare const getUserData: () => UserType;
declare const removeUserData: () => void;
export { getHomeRoute, getUserData, removeUserData, setUserData };
//# sourceMappingURL=index.d.ts.map