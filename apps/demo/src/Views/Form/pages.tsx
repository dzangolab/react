import { useTranslation } from "@dzangolab/react-i18n";
import { Outlet } from "react-router-dom";

import { FileInputDemo } from "./components/FileInput";
import { Demo } from "../../components/Demo";

export const FORM_ROUTES = {
  GET_STARTED: "/form",
  FILE_INPUT: "/form/file-input",
};

export const routes = [
  {
    path: FORM_ROUTES.FILE_INPUT,
    key: "fileInput.title",
    element: <FileInputDemo />,
  },
];

export const Pages = () => {
  const [t] = useTranslation("form");

  const subnav = [
    { route: "/form", label: t("app:getStarted") },
    ...routes.map(({ path, key }) => {
      return { route: path, label: t(key) };
    }),
  ];

  return (
    <Demo subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
