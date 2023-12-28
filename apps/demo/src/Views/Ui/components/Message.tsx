import { useTranslation } from "@dzangolab/react-i18n";
import { Message, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("message.title")}>
      <Section>
        <Message
          message="This is a very important message."
          icon={<i className="pi pi-info-circle" />}
        />
      </Section>
    </Page>
  );
};
