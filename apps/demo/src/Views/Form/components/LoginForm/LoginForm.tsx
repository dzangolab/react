import { Provider, emailSchema, passwordSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { LoginFormFields } from "./LoginFormFields";

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
});

export const LoginForm = () => {
  const [t] = useTranslation("form");
  const navigate = useNavigate();

  return (
    <Page
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Provider
        className="form login-form"
        // eslint-disable-next-line no-console
        onSubmit={(data) => console.log(data)}
        validationSchema={schema}
      >
        <LoginFormFields />
      </Provider>
    </Page>
  );
};
