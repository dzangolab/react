import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Input, Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

export const InputDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("input.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Input placeholder="Input placeholder" label="Input label" />
      </Section>
      <Section>
        <Input
          hasError={true}
          errorMessage="Invalid input"
          placeholder="Input placeholder"
          label="Input label"
        />
      </Section>
    </Page>
  );
};
