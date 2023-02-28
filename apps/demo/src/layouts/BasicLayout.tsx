import { BasicLayout as BaseBasicLayout } from "@dzangolab/react-layout";

import { Outlet } from "react-router-dom";

export const BasicLayout = (): JSX.Element => {
  return <BaseBasicLayout children={<Outlet />} />;
};
