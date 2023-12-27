import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";

import "./index.css";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page title={t("button.title")}>
      <div className="demo-buttons-wrapper">
        <h3>{t("button.usage.severity")}</h3>
        <div className="button-severity">
          <Button label="Primary" severity="primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Alternate" severity="alternate" />
          <Button label="Success" severity="success" />
          <Button label="Danger" severity="danger" />
          <Button label="Warning" severity="warning" />
        </div>
        <h3>{t("button.usage.size")}</h3>
        <div className="button-size">
          <Button
            label="Small"
            size="small"
            variant="filled"
            severity="primary"
          />
          <Button
            label="Medium"
            size="medium"
            variant="filled"
            severity="primary"
          />
          <Button
            label="Large"
            size="large"
            variant="filled"
            severity="primary"
          />
        </div>
        <h3>{t("button.usage.outlined")}</h3>
        <div className="button-outline">
          <Button
            label="Primary"
            size="medium"
            variant="outlined"
            severity="primary"
          />
          <Button
            label="Secondary"
            size="medium"
            variant="outlined"
            severity="secondary"
          />
          <Button
            label="Alternate"
            size="medium"
            severity="alternate"
            variant="outlined"
          />
          <Button label="Success" severity="success" variant="outlined" />
          <Button label="Danger" severity="danger" variant="outlined" />
          <Button label="Warning" severity="warning" variant="outlined" />
        </div>
        <h3>{t("button.usage.icons")}</h3>
        <div className="button-icon">
          <Button variant="filled" iconRight="pi pi-user" />
          <Button
            label="Secondary"
            variant="filled"
            severity="secondary"
            iconLeft="pi pi-check"
          />
          <Button
            label="Alternate"
            variant="filled"
            severity="alternate"
            iconRight="pi pi-times"
          />
          <Button
            label="Alternate"
            size="medium"
            severity="alternate"
            variant="outlined"
            loading={true}
            iconLeft="pi pi-spin pi-spinner"
          />
        </div>
        <h3>{t("button.usage.disabled")}</h3>
        <div className="button-disable">
          <Button
            label="Primary"
            variant="filled"
            severity="primary"
            disabled={true}
          />
          <Button
            label="Outlined"
            variant="outlined"
            severity="primary"
            disabled={true}
          />
        </div>
      </div>
    </Page>
  );
};
