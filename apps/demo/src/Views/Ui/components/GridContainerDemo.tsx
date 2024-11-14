import { useTranslation } from "@dzangolab/react-i18n";
import { Page, GridContainer } from "@dzangolab/react-ui";

import { Package } from "../../Home/components/Package";

export const GridContainerDemo = () => {
  const { t } = useTranslation("ui");

  const packages = [
    {
      name: "Card 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      name: "Card 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      name: "Card 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },

    {
      name: "Card 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      name: "Card 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
  ];

  return (
    <Page title={t("gridContainer.title")} className="home">
      <GridContainer>
        {packages.map((package_) => {
          return (
            <Package
              key={package_.name}
              title={package_.name}
              description={package_.description}
              onClick={() => {}}
            />
          );
        })}
      </GridContainer>
    </Page>
  );
};
