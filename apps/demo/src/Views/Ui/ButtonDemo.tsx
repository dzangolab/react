import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <div className="buttons-wrapper">
      <h3>{t("button.property.severity")}</h3>
      <div className="button-severity">
        <Button label={t("button.label.primary")} severity="primary" />
        <Button label={t("button.label.secondary")} severity="secondary" />
        <Button label={t("button.label.alternate")} severity="alternate" />
      </div>
      <h3>{t("button.property.size.title")}</h3>
      <div className="button-size">
        <Button
          label={t("button.property.size.small")}
          size="small"
          variant="filled"
          severity="primary"
        />
        <Button
          label={t("button.property.size.medium")}
          size="medium"
          variant="filled"
          severity="primary"
        />
        <Button
          label={t("button.property.size.large")}
          size="large"
          variant="filled"
          severity="primary"
        />
      </div>
      <h3>{t("button.property.outline")}</h3>
      <div className="button-outline">
        <Button
          label={t("button.label.primary")}
          size="medium"
          variant="outlined"
          severity="primary"
        />
        <Button
          label={t("button.label.secondary")}
          size="medium"
          variant="outlined"
          severity="secondary"
        />
        <Button
          label={t("button.label.alternate")}
          size="medium"
          severity="alternate"
          variant="outlined"
        />
      </div>
      <h3>{t("button.property.icon.title")}</h3>
      <div className="button-icon">
        <Button variant="filled" iconRight="pi pi-user" />
        <Button
          label={t("button.property.icon.left")}
          variant="filled"
          severity="secondary"
          iconLeft="pi pi-check"
        />
        <Button
          label={t("button.property.icon.right")}
          variant="filled"
          severity="alternate"
          iconRight="pi pi-times"
        />
        <Button
          label={t("button.label.alternate")}
          size="medium"
          severity="alternate"
          variant="outlined"
          loading={true}
          iconLeft="pi pi-spin pi-spinner"
        />
      </div>
      <h3>{t("button.property.disable")}</h3>
      <div className="button-disable">
        <Button
          label={t("button.property.disable")}
          variant="filled"
          severity="primary"
          disabled={true}
        />
        <Button
          label={t("button.property.disable")}
          variant="outlined"
          severity="primary"
          disabled={true}
        />
      </div>
    </div>
  );
};
