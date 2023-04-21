import { LoginForm } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

const Form = () => {
  const { t } = useTranslation();

  return (
    <Page title={t("header.menu.form")}>
      <LoginForm />
    </Page>
  );
};

export default Form;
