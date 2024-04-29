import { Card, Page, Tag } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";
import { useTranslation } from "@dzangolab/react-i18n";

export const CardDemo = () => {
const [t] = useTranslation("ui");

  return (
    <Page title={t("card.title")}>
      <Section>
        <Card
           renderHeader={() => {
            return <div>
              <h3>John Doe</h3>
              <span>john@dzangolab.com</span>
            </div>
          }}
          renderFooter={() => {
            return <>
              <Tag
                label="USER"
              />
              <Tag
                label="Disabled"
              />
            </>
          }}
        />
      </Section>
    </Page>
  );
};
