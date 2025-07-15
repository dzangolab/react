import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Message, Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("message.title")}
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
        <Message
          message="This is a very important message."
          icon={<i className="pi pi-info-circle" />}
        />
      </Section>

      <Section>
        <Message
          message="New features just launched! Check them out."
          icon={<i className="pi pi-android" />}
        />
      </Section>
    </Page>
  );
};
