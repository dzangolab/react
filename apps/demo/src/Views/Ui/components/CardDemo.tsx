import { useTranslation } from "@dzangolab/react-i18n";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Page,
} from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const CardDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("card.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("card.usage.default")}>
        <Card>
          <CardHeader>
            <h3>{t("card.header")}</h3>
          </CardHeader>
          <CardBody>
            <p>{t("card.body")}</p>
          </CardBody>
          <CardFooter>
            <p>{t("card.footer")}</p>
          </CardFooter>
        </Card>
      </Section>
      <Section title={t("card.usage.outlined")}>
        <Card outlined>
          <CardHeader>
            <h3>{t("card.header")}</h3>
          </CardHeader>
          <CardBody>
            <p>{t("card.body")}</p>
          </CardBody>
          <CardFooter>
            <p>{t("card.footer")}</p>
          </CardFooter>
        </Card>
      </Section>
    </Page>
  );
};
