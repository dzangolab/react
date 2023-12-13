import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <div className="buttons-wrapper">
      <Button
        label={t("button.label")}
        size="small"
        variant="filled"
        severity="secondary"
        icon="pi pi-check"
      />
      <Button
        label={t("button.label")}
        size="medium"
        variant="outlined"
        severity="secondary"
      />
      <Button
        label={t("button.label")}
        size="large"
        severity="alternate"
        variant="outlined"
        loading={true}
        loadingIcon="pi pi-spin pi-spinner"
      />
      <Button label={t("button.label")} variant="filled" icon="pi pi-user" />
      <Button
        variant="filled"
        severity="alternate"
        icon="pi pi-user"
        disabled={true}
      />
    </div>
  );
};
