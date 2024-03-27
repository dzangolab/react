import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

  const handleChange = (newValue: (string | number)[]) => {
    setSelectedValues(newValue);
  };

  return (
    <Page title={t("select.title")}>
      <Section>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "BE", label: "BE" },
            { value: "FE", label: "FE" },
            { value: "RE", label: "RE" },
          ]}
          multiple={true}
          value={selectedValues}
          onChange={handleChange}
          placeholder={t("select.placeHolder")}
        />
      </Section>
    </Page>
  );
};
