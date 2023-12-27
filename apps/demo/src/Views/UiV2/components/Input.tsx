import { useTranslation } from "@dzangolab/react-i18n";
import { Input, Page } from "@dzangolab/react-ui";

export const InputDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.input.title")}>
      <Input
        hasError={true}
        errorMessage="Invalid input"
        placeholder="Input placeholder"
        label="Input label"
      />
      <br />
      <Input placeholder="Input placeholder" label="Input label" />
    </Page>
  );
};
