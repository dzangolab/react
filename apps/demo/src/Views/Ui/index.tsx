import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon, Page, ResponsiveMenu } from "@dzangolab/react-ui";

import { SubmitButton } from "./SubmitButton";
import ComponentList from "../../components/ComponentList";
import { MENU_ROUTES } from "../../constants";

const componentList = [
  {
    key: 1,
    title: "Loading",
    component: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LoadingIcon color={"black"} fontSize={"0.5rem"} />
      </div>
    ),
  },
  {
    key: 2,
    title: "Submit Button",
    component: <SubmitButton />,
  },
  {
    key: 3,
    title: "Responsive Menu",
    component: (
      <>
        <Page title="Horizontal menu">
          <ResponsiveMenu routes={MENU_ROUTES} />
        </Page>
        <Page title="Vertical menu">
          <ResponsiveMenu routes={MENU_ROUTES} horizontal />
        </Page>
      </>
    ),
  },
];

const Ui = () => {
  const { t } = useTranslation();

  return (
    <ComponentList componentList={componentList} title={t("header.menu.ui")} />
  );
};

export default Ui;
