import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";

import "./index.css";
import { Section } from "../../../../components/Demo";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page title={t("button.title")}>
      <Section title={t("button.usage.severity")}>
        <div className="demo-buttons-container">
          <Button label="Primary" severity="primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Alternate" severity="alternate" />
          <Button label="Success" severity="success" />
          <Button label="Danger" severity="danger" />
          <Button label="Warning" severity="warning" />
        </div>
      </Section>

      <Section title={t("button.usage.size")}>
        <div className="demo-buttons-container">
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
      </Section>

      <Section title={t("button.usage.outlined")}>
        <div className="demo-buttons-container">
          <Button
            label="Secondary"
            size="medium"
            variant="filled"
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
          <Button label="Secondary" severity="warning" variant="outlined" />
        </div>
      </Section>

      <Section title={t("button.usage.text")}>
        <div className="demo-buttons-container">
          <Button label="Primary" variant="textOnly" />
          <Button label="Secondary" severity="secondary" variant="textOnly" />
          <Button label="Alternate" severity="alternate" variant="textOnly" />
          <Button label="Success" severity="success" variant="textOnly" />
          <Button label="Danger" severity="danger" variant="textOnly" />
          <Button label="Warning" severity="warning" variant="textOnly" />
        </div>
      </Section>

      <Section title={t("button.usage.icons")}>
        <div className="demo-buttons-container">
          <Button
            variant="textOnly"
            severity="secondary"
            iconLeft="pi pi-user"
          />
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
      </Section>

      <Section title={t("button.usage.disabled")}>
        <div className="demo-buttons-container">
          <Button
            variant="textOnly"
            severity="primary"
            iconLeft="pi pi-user"
            disabled={true}
          />
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
      </Section>

      <Section title={t("button.usage.link")}>
        <div className="demo-buttons-container">
          <Button label="Home" to="/" />
          <Button label="Back" severity="secondary" to="/ui" />
        </div>
      </Section>
    </Page>
  );
};
