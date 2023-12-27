import { useTranslation } from "@dzangolab/react-i18n";
import { Checkbox, Page } from "@dzangolab/react-ui";

export const CheckboxDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.checkbox.title")}>
      <Checkbox label="Check here" />
    </Page>
  );
};
