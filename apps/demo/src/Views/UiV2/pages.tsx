import { ButtonDemo } from "./components/Button";
import { LoadingDemo } from "./components/Loading";
import { Demo } from "../../components/Demo";

export const UI_ROUTES = {
  LOADING: "/ui-v2/loading",
  BUTTON: "/ui-v2/button",
};

export const UIRoutes = [
  {
    path: UI_ROUTES.LOADING,
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.BUTTON,
    element: <ButtonDemo />,
  },
];

export const UIPages = () => {
  return (
    <Demo
      routes={[
        { route: UI_ROUTES.LOADING, label: "Loading" },
        { route: UI_ROUTES.BUTTON, label: "Button" },
      ]}
    ></Demo>
  );
};
