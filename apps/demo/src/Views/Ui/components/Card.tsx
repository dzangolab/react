import { Card, Page, Tag } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";
import { useTranslation } from "@dzangolab/react-i18n";

export const CardDemo = () => {
  const [t] = useTranslation("ui");

const renderCardHeader = () => {
  return <>
    <h1>{t("card.component.title")}</h1>
    <span>{t("card.component.subtitle")}</span>
    <Tag
      label="USER"
    />
  </>
}

 const renderCardFooter = () => {
  return <Tag
  label="Disabled"
  color="red"
/>
 }

  return (
    <Page title={t("card.title")}>
      <Section title={t("card.usage.basic")}>
        <Card
          title={t("card.component.title")}
          subTitle={t("card.component.subtitle")}
        >
          <p>{t("card.component.content")}</p>
        </Card>
      </Section>
      <Section title={t("card.usage.custom")}>
        <Card
          renderHeader={renderCardHeader}
          renderContent={() => {
            return <p>{t("card.component.content")}</p>
          }}
          renderFooter={renderCardFooter}
        />
      </Section>
    </Page>
  );
};
