import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";

export const Pages = () => {
  return (
    <Demo subnav={[]}>
      <Outlet />
    </Demo>
  );
};
