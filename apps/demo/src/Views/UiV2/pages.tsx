import { Demo } from "../../components/Demo";
import { ButtonDemo } from "./components/Button";
import { LoadingDemo } from "./components/Loading";
import FilesTableDemo from "./components/FilesTable";
import { useTranslation } from "@dzangolab/react-i18n";
import { ResponsiveMenuDemo } from "./components/ResponsiveMenu";
import { SubmitButtonDemo } from "./components/SubmitButton";

export const UI_ROUTES = {
  LOADING: "/ui-v2/loading",
  BUTTON: "/ui-v2/button",
  SUBMIT_BUTTON: "/ui-v2/submit-button",
  FILES_TABLE: "/ui-v2/files-table",
  RESPONSIVE_MENU: "/ui-v2/responsive-menu",
};

export const UIRoutes = [
  {
    path: UI_ROUTES.LOADING,
    key: "v2.loading.title",
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.BUTTON,
    key: "v2.button.title",
    element: <ButtonDemo />,
  },
  {
    path: UI_ROUTES.SUBMIT_BUTTON,
    key: "v2.submitButton.title",
    element: <SubmitButtonDemo />,
  },
  {
    path: UI_ROUTES.FILES_TABLE,
    key: "v2.filesTable.title",
    element: <FilesTableDemo />,
  },
  {
    path: UI_ROUTES.RESPONSIVE_MENU,
    key: "v2.responsiveMenu.title",
    element: <ResponsiveMenuDemo />,
  },
];

export const UIPages = () => {
  const [t] = useTranslation("ui");

  const routes = UIRoutes.map(({ path, key }) => {
    return { route: path, label: t(key) };
  });

  return <Demo routes={routes}></Demo>;
};
