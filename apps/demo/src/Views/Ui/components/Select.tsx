import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const [multipleSelectedValues, setMultipleSelectedValues] = useState([]);
  const [singleSelectedValues, setSingleSelectedValues] = useState([]);

  const handleMultipleChange = (newValue: any) => {
    setMultipleSelectedValues(newValue);
  };

  const handleSingleChange = (newValue: any) => {
    setSingleSelectedValues(newValue);
  };

  return (
    <Page title={t("select.title")}>
      <Section>
        <Select
          label={t("select.label.single")}
          name="select"
          options={[
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
          ]}
          value={singleSelectedValues}
          onChange={handleSingleChange}
          placeholder={t("select.placeHolder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.multiple")}
          name="select"
          options={[
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "BE", label: "BE" },
            { value: "AR", label: "AR" },
            { value: "RE", label: "RE" },
            { value: "SA", label: "SA" },
            { value: "ME", label: "ME" },
            { value: "TR", label: "TR" },
            { value: "BR", label: "BR" },
          ]}
          multiple={true}
          value={multipleSelectedValues}
          onChange={handleMultipleChange}
          placeholder={t("select.placeHolder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.disabled")}
          name="select"
          options={[{ value: "FR", label: "FR" }]}
          value={[]}
          onChange={() => {}}
          placeholder={t("select.label.disabled")}
          disabled={true}
        />
      </Section>
    </Page>
  );
};
