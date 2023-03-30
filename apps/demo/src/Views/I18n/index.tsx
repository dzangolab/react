import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import TCard from "../../components/Card/TCard";

const I18n = () => {
  const { t } = useTranslation();

  return (
    <Page title={t("header.menu.i18n")}>
      <TCard style={{ width: "18rem" }}>
        <TCard.header>
          <TCard.title>Card</TCard.title>
        </TCard.header>
        <TCard.body> Card Body</TCard.body>
        <TCard.footer>Card Footer</TCard.footer>
      </TCard>
    </Page>
  );
};

export default I18n;
