import { BasicLayout as BaseBasicLayout } from "@dzangolab/react-layout";
import { Outlet } from "react-router-dom";

import "@dzangolab/react-layout/dist/DzangolabReactLayout.css";

export const BasicLayout = (): JSX.Element => {
  return <BaseBasicLayout children={<Outlet />} />;
};
