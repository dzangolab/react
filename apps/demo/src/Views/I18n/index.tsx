import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  CardWrapper,
  TCard,
} from "../../components/Card/TCard";

const I18n = () => {
  const { t } = useTranslation();
  return (
    <Page title={t("header.menu.i18n")}>
      <CardWrapper>
        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>

        <TCard style={{ width: "18rem" }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody> Card Body</CardBody>
          <CardFooter>Card Footer</CardFooter>
        </TCard>
      </CardWrapper>
    </Page>
  );
};

export default I18n;
