import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const [multipleSelectedValues, setMultipleSelectedValues] = useState<
    string[]
  >([]);
  const [singleSelectedValues, setSingleSelectedValues] = useState<number[]>(
    [],
  );
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Page title={t("select.title")}>
      <Section>
        <Select
          label={t("select.label.single")}
          name="select"
          options={[
            { value: 11, label: "option 1" },
            { value: 23, label: "option 2" },
          ]}
          value={singleSelectedValues}
          onChange={(value: number[]) => setSingleSelectedValues(value)}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.multiple")}
          name="select"
          options={[
            { value: "FR", label: "FRANCE" },
            { value: "DE", label: "DENMARK" },
            { value: "BE", label: "BELGIUM" },
            { value: "SA", label: "SANTIAGO" },
            { value: "AR", label: "ARGENTINA" },
            { value: "SR", label: "SRILANKA", disabled: true },
            { value: "NP", label: "NEPAL" },
          ]}
          multiple={true}
          value={multipleSelectedValues}
          onChange={(value: string[]) => setMultipleSelectedValues(value)}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.disabled")}
          name="select"
          options={[{ value: "FR", label: "FR" }]}
          value={[]}
          onChange={() => {}}
          disabled={true}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.invalid")}
          name="select"
          options={[
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "BE", label: "BE" },
            { value: "AR", label: "AR" },
          ]}
          value={selectedValues}
          onChange={(value: string[]) => setSelectedValues(value)}
          hasError={true}
        />
      </Section>
    </Page>
  );
};
