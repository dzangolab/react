import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Message, Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const MessageDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("message.title")}
      subtitle={t("message.subtitle")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("message.usage.basic")}>
        <Message message={t("message.contents.content1")} />
        <CodeBlock exampleCode='<Message message="Season sale: Up to 50% off selected items!" />' />
      </Section>

      <Section title={t("message.usage.icons.icon")}>
        <Message
          message={t("message.contents.content2")}
          icon="pi pi-android"
        />
        <CodeBlock
          exampleCode='<Message 
  message="New features just launched! Check them out!"
  icon="pi pi-android"
/>'
        />
      </Section>

      <Section title={t("message.usage.icons.iconSlot")}>
        <Message
          message={t("message.contents.content3")}
          icon={<i className="pi pi-bell" />}
        />
        <CodeBlock
          exampleCode='<Message 
  message="New Year, New You: Start fresh with our services!"
  icon={<i className="pi pi-bell" />}
/>'
        />
      </Section>

      <Section title={t("message.usage.enableClose")}>
        <Message
          enableClose={true}
          icon={<i className="pi pi-bell" />}
          message={t("message.contents.content4")}
        />
        <CodeBlock
          exampleCode='<Message 
  message="We value your feedback: take our quick survey!"
  icon={<i className="pi pi-bell" />}
  enableClose={true}
/>'
        />
      </Section>
    </Page>
  );
};
