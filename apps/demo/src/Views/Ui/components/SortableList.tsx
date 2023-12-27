import { useTranslation } from "@dzangolab/react-i18n";
import { SortableList, Page } from "@dzangolab/react-ui";

export const SortableListDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("sortableList.title")}>
      <SortableList
        items={[
          { id: 1, data: "Item 1" },
          { id: 2, data: "Item 2" },
          { id: 3, data: "Item 3" },
        ]}
      />
    </Page>
  );
};
