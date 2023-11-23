import { useTranslation } from "@dzangolab/react-i18n";
import { Input } from "@dzangolab/react-ui";

const InputDemo = () => {
  const { t } = useTranslation("ui");

  return <Input error={t("input.error")} label={t("input.label")} />;
};

export default InputDemo;
