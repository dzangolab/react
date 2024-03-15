import { useTranslation } from "@dzangolab/react-i18n";
import { Outlet } from "react-router-dom";

import { ConfirmPasswordForm } from "./components/ConfirmPasswordForm";
import { FileInputDemo } from "./components/FileInput";
import { FormInputDemo } from "./components/FormInput";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Demo } from "../../components/Demo";

export const FORM_ROUTES = {
  GET_STARTED: "/form",
  FILE_INPUT: "/form/file-input",
  FORM_INPUT: "/form/form-input",
  LOGIN_FORM: "/form/login",
  CONFIRM_PASSWORD_FORM: "/form/confirmpassword",
};

export const routes = [
  {
    path: FORM_ROUTES.FILE_INPUT,
    key: "fileInput.title",
    element: <FileInputDemo />,
  },
  {
    path: FORM_ROUTES.FORM_INPUT,
    key: "formInput.title",
    element: <FormInputDemo />,
  },
  {
    path: FORM_ROUTES.LOGIN_FORM,
    key: "loginForm.title",
    element: <LoginForm />,
  },
  {
    path: FORM_ROUTES.CONFIRM_PASSWORD_FORM,
    key: "confirmPasswordForm.title",
    element: <ConfirmPasswordForm />,
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
