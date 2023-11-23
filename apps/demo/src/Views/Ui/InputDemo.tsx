import { useTranslation } from "@dzangolab/react-i18n";
import { Input } from "@dzangolab/react-ui";

const InputDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Input
      error={true}
      errorMessage={t("input.errorMessage")}
      label={t("input.label")}
    />
  );
};

export default InputDemo;
