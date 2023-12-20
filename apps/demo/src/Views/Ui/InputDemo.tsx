import { useTranslation } from "@dzangolab/react-i18n";
import { Input } from "@dzangolab/react-ui";

const InputDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Input
      hasError={true}
      errorMessage={t("input.errorMessage")}
      placeholder={t("input.placeholder")}
      label={t("input.label")}
    />
  );
};

export default InputDemo;
